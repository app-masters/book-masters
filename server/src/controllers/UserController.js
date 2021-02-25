import User from '../models/User.js';
import BaseController from './BaseController.js';

class UserController extends BaseController {
  async getAll(_req, res) {
    const response = await User.find();

    return res.json(response);
  }

  async getById(req, res) {
    const response = await User.findById(req.params.id);

    return res.json(response);
  }

  async create(req, res) {
    try {
      const response = await User.create(req.body);

      return res.json(response);
    } catch (error) {
      this.returnGenericException(res, error);
    }
  }

  async update(req, res) {
    try {
      const response = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
      });

      return res.json(response);
    } catch (error) {
      this.returnGenericException(res, error);
    }
  }

  async delete(req, res) {
    try {
      await User.deleteOne({ _id: req.params.id });

      return res.send();
    } catch (error) {
      this.returnGenericException(res, error);
    }
  }
}

export default new UserController();
