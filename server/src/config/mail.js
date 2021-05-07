import 'dotenv/config.js';

export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  from: `Book Masters <${process.env.MAIL_FROM}>`,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
};
