import pkg from 'mongoose';
const { Schema, model }  = pkg;

const LendingSchema = new Schema(
    {
        idUser: {
            type: String,
            required: true
        },
        idBook: {
            type: String
        },
        status: {
            type: String,
            enum : ['Reservado','Emprestado','Devolvido'],
        },
        reservationDateInit: {
            type: Date
        },
        reservationDateFinally: {
            type: Date
        },
        lendingDateInit: {
            type: Date
        },
        lendingDateFinally: {
            type: Date
        },
        returnDate: {
            type: Date
        },
    }
)

export default new model("Lending", LendingSchema, "lendings")
