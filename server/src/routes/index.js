import express from 'express';
import BookRoute from './book.routes.js';
import lendingRouter from './lending.routes.js';
import userRouter from './user.routes.js';
import NotifyRouter from './notify.routes.js';

const routes = express.Router();

routes.use('/', BookRoute);
routes.use('/', lendingRouter);
routes.use('/', userRouter);
routes.use('/', NotifyRouter);

export default routes;
