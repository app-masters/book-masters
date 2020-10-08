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
            type: Boolean,
        },
        emprestimo: {
            user: {
                name: { type: String },
                email: { type: String },
                date: { type: Date },
            },

        }
    }
)

export default new model("Book", BookSchema, "books")
