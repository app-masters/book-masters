import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import mailer from '../services/mailer';
import User from './User';
import Book from './Book';

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
};

const LendingSchema = new Schema(
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
    status: {
      type: String,
      enum: ['lended', 'borrowed', 'returned']
    },
    returnedAt: Schema.Types.Date,

    lendingStartedAt: Schema.Types.Date,

    lendingEndAt: Schema.Types.Date,

    reservationStartedAt: Schema.Types.Date,

    reservationEndAt: Schema.Types.Date
  },
  schemaOptions
);

LendingSchema.methods.notifyReservation = async function () {
  const user = await User.findOne({ _id: this.idUser }).lean();
  const book = await Book.findOne({ _id: this.idBook }).lean();
  await mailer.sendEmail('reserve', {
    to: user.email,
    subject: '[Book Masters] Livro reservado.',
    context: {
      name: user.name || '',
      bookName: book.title
    }
  });
};

LendingSchema.methods.notifyDueDate = async function (days, type) {
  await mailer.sendEmail('lendEnding', {
    to: this.idUser.email,
    subject: '[Book Masters] Prazo chegando ao fim.',
    context: {
      name: this.idUser.name,
      days: days,
      type
    }
  });
};

export default new model('Lending', LendingSchema, 'lendings');
