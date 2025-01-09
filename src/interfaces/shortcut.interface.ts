import mongoose from "mongoose";

export default interface Shortcut {
  name: string;
  type: string;
  category: string;
  image: string;
  amount: number;
  date: Date;
  user: mongoose.Schema.Types.ObjectId;
}
