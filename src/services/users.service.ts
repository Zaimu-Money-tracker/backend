import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import { HttpError } from "../utils/errors/http.error.js";

export async function getUserById(userId: mongoose.Schema.Types.ObjectId) {
  const userFound = await userModel.findById(userId);

  if (!userFound) {
    throw new HttpError("User not found", 404);
  }

  return userFound;
}
