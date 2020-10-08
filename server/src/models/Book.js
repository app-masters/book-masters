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
            type:[String],
            required: true
        },
        editora: {
            type: String,
            required: true,
        },
        tag: {
            type:[String],
            required: true
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
            type: Boolean,
        },
        emprestimo: {
            user:{
                name: String,
                email: String
            },
            date: Date,
        }
    }
)

export default new model("Book", BookSchema, "books")
