const jwt = require('jsonwebtoken');

import auth from '../config/auth.js';
import User from '../models/User.js';

class AuthController {
  async isAdmin(email) {
    return email === 'tiago@appmasters.io';
  }

  async login(req, res, next) {
    try {
      const { email } = await req.body;
      const user = await User.findOne({ email: email }).exec();

      if (user) {
        const roles = this.isAdmin(email) ? ['admin'] : ['common'];
        const token = jwt.sign({ email, roles: roles }, auth.secret, {
          expiresIn: auth.expiresIn
        });

        res.sendStatus(200).json({ type: 'bearer', token: token });
      } else {
        next({
          status: 401,
          message: 'Usuário não encontrado',
          code: 'E_VALIDATION_FAILED'
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
