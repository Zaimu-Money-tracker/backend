import mongoose from "mongoose";
import goalModel from "../models/goal.model.js";
import Goal from "../interfaces/goal.interface.js";

export async function getAllGoals(userId: mongoose.Schema.Types.ObjectId) {
  return await goalModel.find({ user: userId }).populate("user");
}

export async function getGoal(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  return await goalModel
    .findOne({ user: userId, _id: paramsId })
    .populate("user");
}

export async function createGoal(
  data: Goal & { userId: mongoose.Schema.Types.ObjectId }
) {
  const newGoal = new goalModel({
    ...data,
    user: data.userId,
  });

  return await newGoal.save();
}

export async function deleteGoal(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  return await goalModel.findOneAndDelete({
    user: userId,
    _id: paramsId,
  });
}

export async function updateGoal(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string,
  bodyUpdate: Goal
) {
  return await goalModel.findOneAndUpdate(
    { user: userId, _id: paramsId },
    bodyUpdate,
    { new: true }
  );
}
