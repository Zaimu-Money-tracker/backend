import mongoose from "mongoose";

export default interface Goal {
  name: string;
  image: {
    url: string;
    id: string;
  };
  description: string;
  progress: number;
  targetAmount: number;
  user: mongoose.Schema.Types.ObjectId;
}
