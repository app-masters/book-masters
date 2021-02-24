import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const userRouter = Router();

userRouter.get('/users/', UserController.getAll);
userRouter.get('/users/:id', UserController.getById);
userRouter.post('/users/', UserController.create);
userRouter.put('/users/:id', UserController.update);
userRouter.delete('/users/:id', UserController.delete);

export default userRouter;
