import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["income", "expense"] },
    amount: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    image: {
      url: { type: String, require: false, default: "" },
      id: { type: String, require: false, default: "" },
    },
    description: { type: String, required: false, trim: true, default: "" },
    recurring: { type: Boolean, required: true },
    recurrency: { type: String, required: false, trim: true, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
