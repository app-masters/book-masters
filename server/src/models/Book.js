import { Schema, model } from "mongoose"

const BookSchema = new Schema(
    {
        isbn: {
            type: String,
        },
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
        },
        autor: {
            type: Array,
            required: true
        },
        editora: {
            type: String,
            required: true,
        },
        tag: {
            type: Array
        },
        img: {
            type: String,
        },
        anoPublicacao: {
            type: Number,
        },
        edicao: {
            type: Number,
        },
        status: {
            type: String,
            required: true,
            enum : ['Disponível','Emprestado','Reservado'],
            default: 'Disponível',
        },
    }
)

export default new model("Book", BookSchema, "books")
