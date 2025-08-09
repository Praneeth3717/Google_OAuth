import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  picture: String
});

export default mongoose.model("Bro", userSchema);
