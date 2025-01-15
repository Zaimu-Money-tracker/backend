import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import { HttpError } from "../utils/errors/http.error.js";
import User from "../interfaces/user.interface.js";

export async function getUserById(userId: mongoose.Schema.Types.ObjectId) {
  const userFound = await userModel.findById(userId);

  if (!userFound) {
    throw new HttpError("User not found", 404);
  }

  return userFound;
}

export async function updateUser(
  userId: mongoose.Types.ObjectId,
  bodyUpdate: Partial<User>
) {
  const userFound = await userModel.findOneAndUpdate(
    { _id: userId },
    bodyUpdate,
    { new: true }
  );

  if (!userFound) {
    throw new HttpError("User not found, cannot update", 404);
  }

  return userFound;
}
