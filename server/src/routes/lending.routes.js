import express from 'express';
import LendingController from '../controllers/LendingController.js';
import authMiddleware from '../middleware/auth.js';

const lendingRouter = express.Router();

lendingRouter.get('/lendings/', LendingController.getAll);
lendingRouter.get('/lendings/book/:id', LendingController.getAllBookLending);
lendingRouter.get('/lendings/:id', LendingController.getById);
lendingRouter.put('/lendings/:id', authMiddleware, LendingController.update);
lendingRouter.delete('/lendings/:id', authMiddleware, LendingController.delete);
lendingRouter.post('/lendings/', authMiddleware, LendingController.lending);
lendingRouter.post('/lendings/reserve', authMiddleware, LendingController.reserve);
lendingRouter.post('/lendings/return', authMiddleware, LendingController.returnBook);

export default lendingRouter;
