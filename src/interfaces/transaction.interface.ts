import mongoose from "mongoose";

export default interface Transaction {
  type: string;
  ammount: number;
  name: string;
  category: string;
  image: string;
  description: string;
  date: Date;
  user: mongoose.Schema.Types.ObjectId;
}
