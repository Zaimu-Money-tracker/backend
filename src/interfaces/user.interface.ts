import mongoose from "mongoose";

export default interface User {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  lastName: string;
  userName: string;
  profilePhoto: string;
  profession: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
