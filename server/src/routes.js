import express from 'express';
import LendingController from './controllers/LendingController.js';
import BookController from './controllers/BookController.js';
import UserController from './controllers/UserController.js';
import AuthController from './controllers/AuthController.js';
import NotifyAvailabilityController from './controllers/NotifyAvailabilityController.js';
import authMiddleware from './middleware/auth.js';

const routes = express.Router();

// Auth Routes
routes.post('/login/', AuthController.login);

// Book Routes
routes.get('/books/', BookController.getAll);
routes.get('/books/:id', BookController.getById);
routes.post('/books/', authMiddleware, BookController.create);
routes.put('/books/:id', authMiddleware, BookController.update);
routes.delete('/books/:id', authMiddleware, BookController.delete);

// Lending Routes
routes.get('/lendings/', LendingController.getAll);
routes.get('/lendings/book/:id', LendingController.getAllBookLending);
routes.get('/lendings/:id', LendingController.getById);
routes.put('/lendings/:id', authMiddleware, LendingController.update);
routes.delete('/lendings/:id', authMiddleware, LendingController.delete);
routes.get('/lendings/lend/:bookId', authMiddleware, LendingController.lending);
routes.get('/lendings/reserve/:bookId', authMiddleware, LendingController.reserve);
routes.get('/lendings/return/:bookId', authMiddleware, LendingController.returnBook);

// User Routes
routes.get('/users/', UserController.getAll);
routes.get('/users/:id', UserController.getById);
routes.post('/users/', authMiddleware, UserController.create);
routes.put('/users/:id', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

routes.get('/usersBooks', authMiddleware, UserController.getAllBooks);

// NotifyAvailability Routes
routes.get('/notifyMe/:bookId', authMiddleware, NotifyAvailabilityController.notifyMe);

export default routes;
