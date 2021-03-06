import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(401).json({ error: 'You aren`t logged in' });
  }
  const token = authHeaders.split(' ')[1];

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    req.isAdmin = decoded.admin;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'You aren`t logged in' });
  }
};
