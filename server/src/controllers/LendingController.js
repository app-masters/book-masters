import Lending from '../models/Lending.js';
import NotifyAvailability from '../models/NotifyAvailability.js';
import User from '../models/User.js';
import addDaysToDate from '../utils/addDaysToDate.js';
import deadline from '../config/deadline';

class LendingController {
  async getAll(_req, res) {
    const response = await Lending.find().populate('idUser').populate('idBook');
    return res.json(response);
  }

  async getAllBookLending(req, res) {
    const idBook = req.params.id;

    const lendings = await Lending.find({ idBook, status: { $ne: 'returned' } });

    //console.log(lendings.map((l) => l.idUser));
    const users = await User.find({ _id: { $in: lendings.map((l) => l.idUser) } });

    return res.json({ lendings, users });
  }

  async checkDueDate(req, res, next) {
    const daysToNotify = deadline.notify;
    try {
      const endingDeadline = addDaysToDate('', daysToNotify);

      // Getting all almost due Lended registries
      const allLended = await Lending.find({
        status: 'borrowed',
        returnedAt: null,
        lendingEndAt: { $gte: endingDeadline.startOf('day').toDate(), $lt: endingDeadline.endOf('day').toDate() }
      })
        .populate('idUser')
        .populate('idBook');

      // Getting all almost due reserved registries
      const allReserved = await Lending.find({
        status: 'reserved',
        lendingStartedAt: null,
        reservationEndAt: { $gte: endingDeadline.startOf('day').toDate(), $lt: endingDeadline.endOf('day').toDate() }
      })
        .populate('idUser')
        .populate('idBook');

      const yesterday = addDaysToDate('', -1);
      // Getting all overdue lendings registries
      const overdueLending = await Lending.find({
        status: 'borrowed',
        returnedAt: null,
        lendingEndAt: { $gte: yesterday.startOf('day').toDate(), $lt: yesterday.endOf('day').toDate() }
      })
        .populate('idUser')
        .populate('idBook');

      // Notify admins of the overdue lending
      if (overdueLending && overdueLending.length > 0) {
        for (const lend of overdueLending) {
          await lend.notifyOverdueLending();
        }
      }

      // Sending emails to notify those users
      if ((allLended && allLended.length > 0) || (allReserved && allReserved.length > 0)) {
        for (const lend of [...allLended, ...allReserved]) {
          await lend.notifyDueDate(daysToNotify, lend.status === 'borrowed' ? 'devolução' : 'reserva');
        }
      }
      res.status(200).send('Done');
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getById(req, res) {
    const response = await Lending.findById(req.params.id);
    return res.json(response);
  }

  async lending(req, res, next) {
    try {
      /* Check if book is really available for lending */
      const existingLending = await Lending.find({ idBook: req.params.bookId, status: { $ne: 'returned' } }, (err) => {
        if (err) next(err);
      }).sort({ reservationDateInit: 'asc' });

      /* Todos os livros que não estejam devolvidos
          - Se não tiver nenhum => não tem reserva
          - Se já estiver emprestado
          - Se estiver reservado mas não pro usuário
      */
      if (
        existingLending.length === 0 ||
        existingLending[0].status === 'borrowed' ||
        (existingLending[0].status === 'reserved' && existingLending[0].idUser != req.userId)
      ) {
        next({ error: 406, message: 'Livro emprestado/reservado para outro usuário.' });
      }

      /* TODO: data do cliente ou no servidor */
      const date = new Date();
      const lendingJson = {
        idBook: req.params.bookId,
        idUser: req.userId,
        status: 'borrowed',
        lendingStartedAt: date,
        reservationEndAt: date,
        lendingEndAt: addDaysToDate(date, deadline.borrow)
      };

      const response = await Lending.findOneAndUpdate({ _id: existingLending[0]._id }, lendingJson, { new: true });
      await response.notifyLending();

      return res.json(response).send();
    } catch (error) {
      next(error);
    }
  }

  async reserve(req, res, next) {
    try {
      /* Check if book is really available for reservation */
      // !!CHANGE removed idUser
      const existingLending = await Lending.find({ idBook: req.params.bookId, status: 'reserved' }, (err) => {
        if (err) next(err);
      });

      if (existingLending && existingLending.length > 0) {
        throw { status: 400, message: 'Este livro já está reservado.' };
      }

      /* TODO: definir as datas de acordo com os dados já existentes no banco */
      /* pode vir do front? */
      const date = new Date();
      const reserveJson = {
        idBook: req.params.bookId,
        idUser: req.userId,
        status: 'reserved',
        reservationStartedAt: date,
        reservationEndAt: addDaysToDate(date, deadline.reserve)
      };
      const response = await Lending.create(reserveJson);
      await response.notifyReservation();

      return res.json(response).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async returnBook(req, res, next) {
    try {
      /* Check if book is really available for reservation */
      const existingLending = await Lending.find(
        { idBook: req.params.bookId, idUser: req.userId, status: 'borrowed' },
        (err) => {
          if (err) next();
        }
      );

      if (existingLending.length === 0) throw { status: 409, message: 'Livro não está emprestado para o usuário.' };

      /* TODO: definir as datas de acordo com os dados já existentes no banco */
      /* pode vir do front? */
      const date = new Date();
      const reserveJson = {
        idBook: req.params.bookId,
        idUser: req.userId,
        status: 'returned',
        returnedAt: date,
        lendingEndAt: date
      };

      /*TODO: é possível alterar o existingLending que já existia? */
      const response = await Lending.findOneAndUpdate({ _id: existingLending[0]._id }, reserveJson, { new: true });

      // Notify availability of this returned book
      const objectsToNotify = await NotifyAvailability.find({ idBook: req.params.bookId })
        .populate('idUser')
        .populate('idBook');
      if (objectsToNotify && objectsToNotify.length > 0) {
        for (const item of objectsToNotify) {
          await item.notifyUser();
        }
      }

      return res.json(response).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const response = await Lending.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
      });
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await Lending.deleteOne({ _id: req.params.id });
      return res.send();
    } catch (error) {
      next(error);
    }
  }
}

export default new LendingController();
