import 'dotenv/config.js';

export default {
  secret: process.env.JWT_SECRET,
  expiresIn: '5d',
  refreshExpiresIn: '5d'
};
