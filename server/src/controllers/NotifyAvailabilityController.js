import NotifyAvailability from '../models/NotifyAvailability.js';

class NotifyAvailabilityController {
  async notifyMe(req, res, next) {
    try {
      const existingNotify = await NotifyAvailability.findOne({
        idUser: req.userId,
        idBook: req.params.bookId,
        notifiedAt: ''
      });
      if (existingNotify) {
        return res.status(200).json(existingNotify);
      }

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
