import express from 'express';
import NotifyAvailabilityController from '../controllers/NotifyAvailabilityController.js';
import authMiddleware from '../middleware/auth.js';

const notifyRouter = express.Router();

notifyRouter.get('/notifyMe/:bookId', NotifyAvailabilityController.notifyMe);

export default notifyRouter;
