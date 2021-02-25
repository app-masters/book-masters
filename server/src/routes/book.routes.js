import express from 'express';
import BookController from '../controllers/BookController.js';
import authMiddleware from '../middleware/auth.js';

const bookRouter = express.Router();

bookRouter.get('/books/', BookController.getAll);
bookRouter.get('/books/:id', BookController.getById);
bookRouter.post('/books/', authMiddleware, BookController.create);
bookRouter.put('/books/:id', authMiddleware, BookController.update);
bookRouter.delete('/books/:id', authMiddleware, BookController.delete);

export default bookRouter;
