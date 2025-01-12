import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: {
      url: { type: String, require: false, default: "" },
      id: { type: String, require: false, default: "" },
    },
    description: { type: String, required: false, default: "" },
    progress: { type: Number, required: true },
    goal: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
