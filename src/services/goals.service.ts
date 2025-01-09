import mongoose from "mongoose";
import goalModel from "../models/goal.model.js";
import Goal from "../interfaces/goal.interface.js";
import { HttpError } from "../utils/errors/http.error.js";

export async function getAllGoals(userId: mongoose.Schema.Types.ObjectId) {
  const goalsFound = await goalModel.find({ user: userId }).populate("user");

  if (!goalsFound) {
    throw new HttpError("No goals found", 404);
  }

  return goalsFound;
}

export async function getGoal(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const goalFound = await goalModel
    .findOne({ user: userId, _id: paramsId })
    .populate("user");

  if (!goalFound) {
    throw new HttpError("Goal not found", 404);
  }

  return goalFound;
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
  const goalFound = await goalModel.findOneAndDelete({
    user: userId,
    _id: paramsId,
  });

  if (!goalFound) {
    throw new HttpError("Goal not found, cannot delete", 404);
  }

  return goalFound;
}

export async function updateGoal(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string,
  bodyUpdate: Goal
) {
  const goalFound = await goalModel.findOneAndUpdate(
    { user: userId, _id: paramsId },
    bodyUpdate,
    { new: true }
  );

  if (!goalFound) {
    throw new HttpError("Goal not found, cannot update", 404);
  }

  return goalFound;
}
