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
      type: String
    },
    phoneNumber: {
      type: String
    },
    role: {
      type: String,
      enum: ['admin', 'common'],
      required: true
    },
    slug: {
      type: String
    }
  },
  schemaOptions
);

export default new model('User', UserSchema, 'users');
