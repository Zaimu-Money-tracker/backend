import mongoose from "mongoose";

export default interface Shortcut {
  name: string;
  type: string;
  category: mongoose.Schema.Types.ObjectId;
  amount: number;
  user: mongoose.Schema.Types.ObjectId;
}
