import mongoose from "mongoose";

const shortcutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    category: { type: String, required: false, trim: true, default: "" },
    image: { type: String, required: false },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Shortcut", shortcutSchema);
