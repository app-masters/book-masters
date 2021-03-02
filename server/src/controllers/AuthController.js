import jwt from 'jsonwebtoken';

import auth from '../config/auth.js';
import User from '../models/User.js';

const isAdmin = (email) => {
  return email.includes('admin');
};

class AuthController {
  async login(req, res, next) {
    try {
      const { email } = await req.body;
      let user = await User.findOne({ email }).exec();

      if (!user) {
        user = await User.create({ email, role: isAdmin(email) ? 'admin' : 'common' });
      }

      const token = jwt.sign({ id: user._id, email, admin: isAdmin(email) }, auth.secret, {
        expiresIn: auth.expiresIn
      });
      res.json({ user, type: 'bearer', token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new AuthController();
