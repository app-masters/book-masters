import User from '../models/User';
import Lending from '../models/Lending';

class UserController {
  async getAll(_req, res) {
    const response = await User.find();

    return res.json(response);
  }

  async getAllBooks(req, res) {
    const response = await Lending.find({ idUser: req.userId, status: { $ne: 'Devolvido' } })
      .populate('idBook')
      .lean();
    return res.json(response);
  }

  async getById(req, res) {
    const response = await User.findById(req.params.id);

    return res.json(response);
  }

  async create(req, res, next) {
    try {
      const response = await User.create(req.body);

      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const response = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
      });

      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await User.deleteOne({ _id: req.params.id });

      return res.send();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
