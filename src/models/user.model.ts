import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
