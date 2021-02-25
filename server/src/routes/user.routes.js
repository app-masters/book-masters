import express from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/users/', UserController.getAll);
userRouter.get('/users/:id', UserController.getById);
userRouter.post('/users/', authMiddleware, UserController.create);
userRouter.put('/users/:id', authMiddleware, UserController.update);
userRouter.delete('/users/:id', authMiddleware, UserController.delete);

export default userRouter;
