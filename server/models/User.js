import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Store hashed password
});

const User = mongoose.model("User", UserSchema);
export default User;