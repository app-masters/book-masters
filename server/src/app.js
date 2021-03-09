import express from 'express';
import cors from 'cors';
import routes from './routes';

import 'dotenv/config.js';
import './database/connection.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
