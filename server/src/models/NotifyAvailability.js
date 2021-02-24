import pkg from 'mongoose';
const { Schema, model } = pkg;

const schemaOptions = {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
};

const UserSchema = new Schema(
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

export default new model('NotifyAvailability', UserSchema);
