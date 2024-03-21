import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 40 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300,
    unique: true,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 2000 },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
