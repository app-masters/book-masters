import 'dotenv/config.js';

export default {
  borrow: process.env.DEADLINE_BORROW,
  reserve: process.env.DEADLINE_RESERVE,
  notify: process.env.DEADLINE_NOTIFY
};
