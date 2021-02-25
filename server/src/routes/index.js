import express from 'express';
import BookRoute from './book.routes.js';
import lendingRouter from './lending.routes.js';
import userRouter from './user.routes.js';

const routes = express.Router();

routes.use('/', BookRoute);
routes.use('/', lendingRouter);
routes.use('/', userRouter);

export default routes;
