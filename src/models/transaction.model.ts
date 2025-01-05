import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["income", "expense"] },
    ammount: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: "" },
    image: { type: String, required: false, default: "" },
    description: { type: String, required: false, trim: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
