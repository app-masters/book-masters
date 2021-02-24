import pkg from 'mongoose';
const { Schema, model } = pkg;

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
      enum: ['Reservado', 'Emprestado', 'Devolvido']
    },
    returnedAt: Schema.Types.Date,

    lendingStartedAt: Schema.Types.Date,

    lendingEndAt: Schema.Types.Date,

    reservationStartedAt: Schema.Types.Date,

    reservationEndAt: Schema.Types.Date
  },
  schemaOptions
);

export default new model('Lending', LendingSchema, 'lendings');
