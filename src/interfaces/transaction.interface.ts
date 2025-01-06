import mongoose from "mongoose";

export default interface Transaction {
  type: string;
  amount: number;
  name: string;
  category: string;
  image: string;
  description: string;
  date: Date;
  user: mongoose.Schema.Types.ObjectId;
}
