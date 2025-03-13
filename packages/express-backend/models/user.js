import mongoose, { Schema } from "mongoose";

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);

export default User;
