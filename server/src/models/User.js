import pkg from 'mongoose';
const { Schema, model } = pkg;

const schemaOptions = {
  timestamps: { createdAt: 'createdAt' }
};

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'common'],
      required: true
    }
  },
  schemaOptions
);

export default new model('User', UserSchema, 'users');
