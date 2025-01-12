import mongoose from "mongoose";

export default interface Goal {
  name: string;
  image: {
    url: string;
    id: string;
  };
  description: string;
  progress: number;
  goal: number;
  user: mongoose.Schema.Types.ObjectId;
}
