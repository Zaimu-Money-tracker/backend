import mongoose from "mongoose";
import userModel from "../models/user.model.js";

export async function getUserById(userId: mongoose.Schema.Types.ObjectId) {
  return await userModel.findById(userId);
}
