import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["income", "expense"] },
    ammount: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    image: { type: String, required: false },
    description: { type: String, required: false, trim: true },
    date: { type: Date, default: Date.now },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("transaction", transactionSchema);
