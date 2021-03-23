import 'dotenv/config.js';

export default {
  api: process.env.DEV_FINDER_API,
  testMode: process.env.DEV_FINDER_TEST_MODE,
  frontUrl: process.env.DEV_FINDER_FRONT_URL
};
