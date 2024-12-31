import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, unique: true, required: true },
});

export default mongoose.model("user", userSchema);
