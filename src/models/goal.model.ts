import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    progress: { type: Number, required: true },
    goal: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
