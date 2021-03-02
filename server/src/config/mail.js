import 'dotenv/config.js';

export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  from: process.env.MAIL_FROM,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
};
