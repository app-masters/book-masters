import Book from '../models/Book';
import Lending from '../models/Lending';
import db from 'mongodb';
const { ObjectID } = db;

class BookController {
  async getAll(_req, res) {
    const response = await Book.find().lean();
    const listA = [];
    // TODO: replace this code
    for (let i = 0; i < response.length; i++) {
      const item = response[i];
      const lending = await Lending.findOne({ idBook: item._id, returnedAt: null });
      listA.push({
        ...item,
        status: lending ? lending.status : 'Disponível',
        idUserReserve: lending ? lending.idUser : null
      });
    }
    return res.json(listA);
  }

  async getById(req, res) {
    const response = await Book.findById(req.params.id).lean();
    const lending = await Lending.findOne({ idBook: response._id, returnedAt: null }).lean();

    return res.json({
      ...response,
      status: lending ? lending.status : 'Disponível',
      idUserReserve: lending ? lending.idUser : null
    });
  }

  async create(req, res, next) {
    try {
      // Validating input
      const validator = Book.validate(req.body);
      if (validator.fails()) {
        next({
          status: 400,
          message: 'Erro de validação',
          code: 'E_VALIDATION_FAILED',
          fields: validator.errors.errors
        });
      }

      // Verifying if already exists a book with the same title and publishCompany
      const book = await Book.find({ title: req.body.title, publishingCompany: req.body.publishingCompany });
      if (book && book.length > 0) {
        throw {
          status: 409,
          message: 'Este livro já foi cadastrado.'
        };
      }

      const data = {
        idUser: ObjectID(Number(req.body.idUser)),
        ...req.body
      };
      const response = await Book.create(data);

      return res.json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async update(req, res) {
    try {
      // Validating input
      const validator = Book.validate(req.body);
      if (validator.fails()) {
        next({
          status: 400,
          message: 'Erro de validação',
          code: 'E_VALIDATION_FAILED',
          fields: validator.errors.errors
        });
      }

      const response = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
      });

      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res) {
    try {
      await Book.deleteOne({ _id: req.params.id });

      return res.send();
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
