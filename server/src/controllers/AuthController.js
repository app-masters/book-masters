import jwt from 'jsonwebtoken';

import auth from '../config/auth.js';
import User from '../models/User.js';

const isAdmin = (email) => {
  return ['tiago@tiagogouvea.com.br', 'tiago@appmasters.io'].includes(email);
};
class AuthController {
  async login(req, res, next) {
    try {
      const { email } = await req.body;
      const user = await User.findOne({ email: email }).exec();
      if (user) {
        const token = jwt.sign({ email, admin: isAdmin(email) }, auth.secret, {
          expiresIn: auth.expiresIn
        });

        res.json({ type: 'bearer', token: token });
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
