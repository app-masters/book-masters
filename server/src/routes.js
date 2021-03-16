import express from 'express';
import LendingController from './controllers/LendingController.js';
import BookController from './controllers/BookController.js';
import UserController from './controllers/UserController.js';
import AuthController from './controllers/AuthController.js';
import NotifyAvailabilityController from './controllers/NotifyAvailabilityController.js';
import authMiddleware from './middleware/auth.js';
import commonMiddleware from './middleware/common';
import isAdminMiddleware from './middleware/isAdmin';
import mailer from './services/mailer.js';
import appConfig from './config/app.js';

const routes = express.Router();

routes.get('/mail-example', async (req, res) => {
  try {
    // Mail example
    // await mailer.sendEmail('reserve', {
    //   to: 'viniciuss10@hotmail.com',
    //   subject: 'Livro reservado.',
    //   context: {
    //     name: 'vinicius'
    //   }
    // });

    await mailer.sendEmail('lendEnding', {
      to: 'viniciuss10@hotmail.com',
      subject: 'Prazo chegando ao fim.',
      context: {
        name: 'vinicius',
        days: 1,
        type: 'devolução'
      }
    });


    // await mailer.sendEmail('notifyAvailability', {
    //   to: 'viniciuss10@hotmail.com',
    //   subject: 'Livro Disponível.',
    //   context: {
    //     name: 'vinicius',
    //     bookName: 'Senhor dos aneis',
    //     bookUrl: `${appConfig.frontUrl}/bookId`
    //   }
    // });

    res.status(200).json({ message: 'Email enviado com sucesso.' });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// Auth Routes
routes.post('/login/', AuthController.login);

// Book Routes
routes.get('/books/', BookController.getAll);
routes.get('/books/:id', commonMiddleware, BookController.getById);
routes.post('/books/', authMiddleware, isAdminMiddleware, BookController.create);
routes.put('/books/:id', authMiddleware, isAdminMiddleware, BookController.update);
routes.delete('/books/:id', authMiddleware, isAdminMiddleware, BookController.delete);

// Lending Routes
routes.get('/lendings/', authMiddleware, isAdminMiddleware, LendingController.getAll);
routes.get('/lendings/book/:id', LendingController.getAllBookLending);
routes.get('/lendings/:id', LendingController.getById);
routes.put('/lendings/:id', authMiddleware, isAdminMiddleware, LendingController.update);
routes.delete('/lendings/:id', authMiddleware, isAdminMiddleware, LendingController.delete);
routes.get('/lendings/lend/:bookId', authMiddleware, LendingController.lending);
routes.get('/lendings/reserve/:bookId', authMiddleware, LendingController.reserve);
routes.get('/lendings/return/:bookId', authMiddleware, LendingController.returnBook);

// User Routes
routes.get('/users/', UserController.getAll);
routes.get('/users/:id', UserController.getById);
routes.post('/users/', authMiddleware, UserController.create);
routes.put('/users/:id', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, isAdminMiddleware, UserController.delete);

routes.get('/usersBooks', authMiddleware, UserController.getAllBooks);

// NotifyAvailability Routes
routes.get('/notifyMe/:bookId', authMiddleware, NotifyAvailabilityController.notifyMe);

//test
routes.get('/', function (req, res) {
  res.send(JSON.stringify({ 'I am': 'alive!' }));
});

export default routes;
