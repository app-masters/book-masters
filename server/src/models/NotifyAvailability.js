import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { errorMessage } from './constraints';

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

NotifyAvailabilitySchema.statics.validate = (obj) => {
  const rules = {
    idUser: 'required',
    idBook: 'required'
  };

  const validator = new Validator(obj, rules, errorMessage());
  validator.setAttributeNames({
    idUser: 'Id do usuário',
    idUser: 'Id do livro'
  });
  return validator;
};

export default new model('NotifyAvailability', NotifyAvailabilitySchema);
