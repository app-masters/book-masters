import Book from '../models/Book.js';
import BaseController from './BaseController.js';

class BookController extends BaseController {
  async getAll(_req, res) {
    const response = await Book.find();

    return res.json(response);
  }

  async getById(req, res) {
    const response = await Book.findById(req.params.id);

    return res.json(response);
  }

  async create(req, res) {
    try {
      const response = await Book.create(req.body);

      return res.json(response);
    } catch (error) {
      this.returnGenericException(res, error);
    }
  }

  async update(req, res) {
    try {
      const response = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
      });

      return res.json(response);
    } catch (error) {
      this.returnGenericException(res, error);
    }
  }

  async delete(req, res) {
    try {
      await Book.deleteOne({ _id: req.params.id });

      return res.send();
    } catch (error) {
      this.returnGenericException(res, error);
    }
  }
}

export default new BookController();
