import { Schema, model } from "mongoose"

const UserSchema = new Schema(
    {
        email:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:String,
            required:true
        }
    }
)

export default new model("User", UserSchema, "users")
