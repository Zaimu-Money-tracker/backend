import mongoose from "mongoose";

export default interface Transaction {
  type: string;
  amount: number;
  name: string;
  category: string;
  image: {
    url: string;
    id: string;
  };
  description: string;
  recurring: boolean;
  recurrency: string;
  user: mongoose.Schema.Types.ObjectId;
}
