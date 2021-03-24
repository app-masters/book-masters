import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import mailer from '../services/mailer';
import User from './User';
import Book from './Book';
import deadlineConfig from '../config/deadline';
import devFinderConfig from '../config/devFinder';

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
      enum: ['reserved', 'borrowed', 'returned']
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
    subject: 'Livro reservado',
    context: {
      name: user.name || '',
      bookName: book.title,
      days: deadlineConfig.reserve
    }
  });
  // Notifying admins too
  await mailer.sendEmail('reserve-admin', {
    to: await User.getAdminsEmail(),
    subject: 'Livro reservado',
    context: {
      name: user.name || '',
      email: user.email,
      bookName: book.title,
      phone: user.phoneNumber,
      profile: `${devFinderConfig.frontUrl}/dev/${user.slug}`
    }
  });
};

LendingSchema.methods.notifyLending = async function () {
  const user = await User.findOne({ _id: this.idUser }).lean();
  const book = await Book.findOne({ _id: this.idBook }).lean();
  // Notifying admins
  await mailer.sendEmail('lend-admin', {
    to: await User.getAdminsEmail(),
    subject: 'Livro emprestado',
    context: {
      name: user.name || '',
      email: user.email,
      bookName: book.title,
      phone: user.phoneNumber,
      profile: `${devFinderConfig.frontUrl}/dev/${user.slug}`
    }
  });
};

LendingSchema.methods.notifyDueDate = async function (days, type) {
  await mailer.sendEmail('lendEnding', {
    to: this.idUser.email,
    subject: 'Prazo para devolver o livro chegando ao fim',
    context: {
      name: this.idUser.name,
      days: days,
      type
    }
  });
};

LendingSchema.methods.notifyOverdueLending = async function () {
  // Notifying admins
  await mailer.sendEmail('overdueLend-admin', {
    to: await User.getAdminsEmail(),
    subject: 'Devolução atrasada',
    context: {
      name: this.idUser.name || '',
      email: this.idUser.email,
      bookName: this.idBook.title,
      phone: this.idUser.phoneNumber,
      profile: `${devFinderConfig.frontUrl}/dev/${this.idUser.slug}`
    }
  });
};

export default new model('Lending', LendingSchema, 'lendings');
