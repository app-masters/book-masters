import Book from '../models/Book.js';

class BookController {
  async getAll(_req, res) {
    const response = await Book.find();

    return res.json(response);
  }

  async getById(req, res) {
    const response = await Book.findById(req.params.id);

    return res.json(response);
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
      if (book) {
        throw {
          status: 409,
          message: 'Este livro já foi cadastrado.'
        };
      }

      const response = await Book.create(req.body);

      return res.json(response);
    } catch (error) {
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
