import { Schema, model } from "mongoose"

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
            type: String
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
        lendingDateInit: {
            type: Date
        },
        returnDate: {
            type: Date
        },
    }
)

export default new model("Lending", LendingSchema, "lendings")
