import NotifyAvailability from '../models/NotifyAvailability.js';

class NotifyAvailabilityController {
  async notifyMe(req, res, next) {
    try {
      const response = await NotifyAvailability.create({
        idUser: req.userId,
        idBook: req.params.bookId,
        notifiedAt: ''
      });

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new NotifyAvailabilityController();
