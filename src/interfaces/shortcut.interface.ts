import mongoose from "mongoose";

export default interface Shortcut {
  name: string;
  type: string;
  category: string;
  image: {
    url: string;
    id: string;
  };
  amount: number;
  user: mongoose.Schema.Types.ObjectId;
}
