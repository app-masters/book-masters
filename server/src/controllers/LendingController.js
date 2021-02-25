import Lending from '../models/Lending.js';
import User from '../models/User.js';
import addDaysToDate from '../utils/addDaysToDate.js';
import preprocessEmail from '../utils/preprocessEmail.js';
import BaseController from './BaseController.js';

const findOrCreateUser = async (name, email, phone) => {
  const user = await User.find({ email });
  if (user.length > 0) {
    //console.log(user[0]._id);
    return user[0]._id;
  } else {
    const userJson = {
      email: email,
      name: name,
      phoneNumber: phone
    };

    let newUser = await User.create(userJson);
    //let responseUser = res.json(newUser);
    //console.log(responseUser._id);
    return newUser._id;
  }
};

class LendingController extends BaseController {
  async getAll(_req, res) {
    const response = await Lending.find();
    return res.json(response);
  }

  async getAllBookLending(req, res) {
    const idBook = req.params.id;

    const lendings = await Lending.find({ idBook, status: { $ne: 'Devolvido' } });

    //console.log(lendings.map((l) => l.idUser));
    const users = await User.find({ _id: { $in: lendings.map((l) => l.idUser) } });

    return res.json({ lendings, users });
  }

  async getById(req, res) {
    const response = await Lending.findById(req.params.id);
    return res.json(response);
  }

  async lending(req, res) {
    try {
      const lending = await req.body;

      const { email } = lending.person;

      const procEmail = preprocessEmail(email);
      if (!procEmail) return this.returnGenericException({ error: 406, message: 'Email inválido.' });

      /* Find User */
      const user = await User.findOne({ email: procEmail });
      const idUser = user._id;

      /* Check if book is really available for lending */

      const existingLending = await Lending.find({ idBook: lending.id_book, status: { $ne: 'Devolvido' } }, (err) => {
        if (err) return this.returnGenericException();
      }).sort({ reservationDateInit: 'asc' });

      /* Todos os livros que não estejam devolvidos
          - Se não tiver nenhum => não tem reserva
          - Se já estiver emprestado
          - Se estiver reservado mas não pro usuário
      */
      if (
        existingLending.length === 0 ||
        existingLending[0].status === 'Emprestado' ||
        (existingLending[0].status === 'Reservado' && existingLending[0].idUser != idUser)
      ) {
        return this.returnGenericException({ error: 406, message: 'Livro emprestado/reservado para outro usuário.' });
      }

      /* TODO: data do cliente ou no servidor */
      const date = new Date();
      const lendingJson = {
        idBook: lending.id_book,
        idUser: idUser,
        status: 'Emprestado',
        lendingDateInit: date,
        lendingDateFinally: addDaysToDate(date, 28)
      };

      // const book = await Book.findOneAndUpdate({ _id: lending.id_book }, { status: 'Emprestado' });

      const response = await Lending.findOneAndUpdate({ _id: existingLending[0]._id }, lendingJson, { new: true });

      return res.json(response).send();
    } catch (e) {
      this.returnGenericException(res, e);
    }
  }

  async reserve(req, res) {
    try {
      const lending = await req.body;

      const { name, email, phoneNumber } = lending.person;

      const procEmail = preprocessEmail(email);
      if (!procEmail) return this.returnGenericException({ error: 406, message: 'Email inválido.' });

      /* Find or Create User */
      const idUser = await findOrCreateUser(name, procEmail, phoneNumber);

      /* Check if book is really available for reservation */
      const existingLending = await Lending.find(
        { idBook: lending.id_book, idUser: idUser, status: 'Reservado' },
        (err) => {
          if (err) return this.returnGenericException();
        }
      );

      if (existingLending.length != 0)
        return this.returnGenericException({ error: 406, message: 'Livro já está reservado pelo usuário.' });

      /* TODO: definir as datas de acordo com os dados já existentes no banco */
      /* pode vir do front? */
      const date = new Date();
      const reserveJson = {
        idBook: lending.id_book,
        idUser: idUser,
        status: 'Reservado',
        reservationDateInit: date,
        reservationDateFinally: addDaysToDate(date, 3)
      };

      // const book = await Book.findOneAndUpdate(
      //   { _id: lending.id_book, status: { $ne: 'Emprestado' } },
      //   { status: 'Reservado' }
      // );

      const response = await Lending.create(reserveJson);

      return res.json(response).send();
    } catch (e) {
      this.returnGenericException(res, e);
    }
  }

  async returnBook(req, res) {
    const lending = await req.body;
    try {
      const { email } = lending.person;

      const procEmail = preprocessEmail(email);
      if (!procEmail) return this.returnGenericException({ error: 406, message: 'Email inválido.' });

      /* Find or Create User */
      const user = await User.findOne({ email: procEmail });
      const idUser = user._id;

      /* Check if book is really available for reservation */
      const existingLending = await Lending.find(
        { idBook: lending.id_book, idUser: idUser, status: 'Emprestado' },
        (err) => {
          if (err) return this.returnGenericException();
        }
      );

      if (existingLending.length === 0) return res.status(406).send('Livro não está emprestado pra o usuário.');

      /* TODO: definir as datas de acordo com os dados já existentes no banco */
      /* pode vir do front? */
      const date = new Date();
      const reserveJson = {
        idBook: lending.id_book,
        idUser: idUser,
        status: 'Devolvido',
        returnDate: date
      };

      /*TODO: é possível alterar o existingLending que já existia? */
      const response = await Lending.findOneAndUpdate({ _id: existingLending[0]._id }, reserveJson, { new: true });

      // /* Encontra o livro e, se não estiver reservado, deixa disponível */
      // const book = await Book.findOneAndUpdate(
      //   { _id: lending.id_book, status: { $ne: 'Reservado' } },
      //   { status: 'Disponível' }
      // );

      return res.json(response).send();
    } catch (e) {
      this.returnGenericException(res, e);
    }
  }

  async update(req, res) {
    try {
      const response = await Lending.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
      });
      return res.json(response);
    } catch (error) {
      this.returnGenericException(res, error);
    }
  }

  async delete(req, res) {
    try {
      await Lending.deleteOne({ _id: req.params.id });
      return res.send();
    } catch (error) {
      this.returnGenericException(res, error);
    }
  }
}

export default new LendingController();
