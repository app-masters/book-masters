import { Schema, model } from "mongoose"

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

export default new model("User", UserSchema, "users")
