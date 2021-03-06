import jwt from 'jsonwebtoken';

import auth from '../config/auth.js';
import User from '../models/User.js';
import isAdmin from '../utils/isAdmin';
import devFinder from '../config/devFinder';
import fetch from 'node-fetch';

class AuthController {
  async login(req, res, next) {
    try {
      const { email } = await req.body;

      const response = await fetch(`${devFinder.api}?email=${email}&test=${devFinder.testMode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        const text = await response.json();
        if (response.status === 400) return res.status(response.status).send(text.message);
        else if (response.status === 404) return res.status(response.status).send(text.error);
      }
      const userData = await response.json();

      let user = await User.findOne({ email }).exec();
      if (!user) {
        user = await User.create({ ...userData, role: isAdmin(email) ? 'admin' : 'common' });
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
