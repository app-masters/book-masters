import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { errorMessage } from './constraints';
import appConfig from '../config/app';
import mailer from '../services/mailer';

const schemaOptions = {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
};

const NotifyAvailabilitySchema = new Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    idBook: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    notifiedAt: Schema.Types.Date
  },
  schemaOptions
);

NotifyAvailabilitySchema.methods.notifyUser = async function () {
  await mailer.sendEmail('notifyAvailability', {
    to: this.idUser.email,
    subject: 'Livro Disponível',
    context: {
      name: this.idUser.name,
      bookName: this.idBook.title,
      bookUrl: `${appConfig.frontUrl}/${this.idBook._id}`
    }
  });
};

NotifyAvailabilitySchema.statics.validate = (obj) => {
  const rules = {
    idUser: 'required',
    idBook: 'required'
  };

  const validator = new Validator(obj, rules, errorMessage());
  validator.setAttributeNames({
    idUser: 'Id do usuário',
    idBook: 'Id do livro'
  });
  return validator;
};

export default new model('NotifyAvailability', NotifyAvailabilitySchema);
