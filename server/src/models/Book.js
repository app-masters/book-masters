import pkg from 'mongoose';
const { Schema, model } = pkg;
import Validator from 'validatorjs';

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
  const errorMessage = {
    required: 'O campo :attribute é obrigatório.',
    in: "As opções válidas para o campo :attribute são: 'Disponível', 'Emprestado', 'Reservado'"
  };
  const rules = {
    idUser: 'required',
    title: 'required',
    publishingCompany: 'required',
    author: 'required'
  };

  const validator = new Validator(obj, rules, errorMessage);
  validator.setAttributeNames({
    title: 'título',
    idUser: 'Id do usuário',
    publishingCompany: 'editora',
    author: 'autor'
  });
  return validator;
};

export default new model('Book', BookSchema, 'books');
