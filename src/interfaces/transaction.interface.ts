import mongoose from "mongoose";

export default interface Transaction {
  type: string;
  ammount: number;
  name: string;
  category: string;
  image: string;
  description: string;
  date: Date;
  userId: mongoose.Schema.Types.ObjectId;
}
