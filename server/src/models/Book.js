import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import Validator from 'validatorjs';
import { errorMessage } from './constraints';

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
};

const BookSchema = new Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isbn: {
      type: String
    },
    title: {
      type: String,
      require: true
    },
    description: {
      type: String
    },
    author: {
      type: Array,
      required: true
    },
    publishingCompany: {
      type: String,
      required: true
    },
    tag: {
      type: Array
    },
    imageUrl: {
      type: String
    },
    publicationYear: {
      type: Number
    },
    edition: {
      type: Number
    },
    status: {
      type: String,
      required: true,
      enum: ['Disponível', 'Emprestado', 'Reservado'],
      default: 'Disponível'
    }
  },
  schemaOptions
);

BookSchema.statics.validate = (obj) => {
  const rules = {
    idUser: 'required',
    title: 'required',
    publishingCompany: 'required',
    author: 'required',
    status: ['required', { in: ['Disponível', 'Emprestado', 'Reservado'] }]
  };

  const validator = new Validator(obj, rules, errorMessage(['Disponível', 'Emprestado', 'Reservado'].join(', ')));
  validator.setAttributeNames({
    title: 'título',
    idUser: 'Id do usuário',
    publishingCompany: 'editora',
    author: 'autor'
  });
  return validator;
};

export default new model('Book', BookSchema, 'books');
