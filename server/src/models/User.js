import pkg from 'mongoose';
const { Schema, model }  = pkg;

const UserSchema = new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
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
