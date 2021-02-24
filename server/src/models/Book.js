import pkg from 'mongoose';
const { Schema, model }  = pkg;

const schemaOptions = {
    timestamps: { 
        createdAt: 'createdAt', 
        updatedAt: 'updatedAt', 
    },
};

const BookSchema = new Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
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
        author: {
            type: Array,
            required: true
        },
        publishingCompany: {
            type: String,
            required: true,
        },
        tag: {
            type: Array
        },
        imageUrl: {
            type: String,
        },
        publicationYear: {
            type: Number,
        },
        edition: {
            type: Number,
        },
        status: {
            type: String,
            required: true,
            enum : ['Disponível','Emprestado','Reservado'],
            default: 'Disponível',
        },
    }, schemaOptions
)

export default new model("Book", BookSchema, "books")
