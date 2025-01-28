import mongoose from "mongoose";
import userModel from "../../models/user/user.model.js";
import User from "../../interfaces/user/user.interface.js";

export async function getUserById(userId: mongoose.Schema.Types.ObjectId) {
  const userFound = await userModel.findById(userId);

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

  return userFound;
}
