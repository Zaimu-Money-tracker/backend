import mongoose from "mongoose";

const shortcutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, enum: ["income", "expense"] },
    type: { type: String, required: true, trim: true },
    category: { type: String, required: false, trim: true, default: "" },
    image: {
      url: { type: String, require: false, default: "" },
      id: { type: String, require: false, default: "" },
    },
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Shortcut", shortcutSchema);
