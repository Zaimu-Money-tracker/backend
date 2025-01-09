import mongoose from "mongoose";
import shortcutModel from "../models/shortcut.model.js";
import { HttpError } from "../utils/errors/http.error.js";
import Shortcut from "../interfaces/shortcut.interface.js";

export async function getAllShortcuts(userId: mongoose.Schema.Types.ObjectId) {
  const shortcutsFound = await shortcutModel
    .find({ user: userId })
    .populate("user");

  if (!shortcutsFound) {
    throw new HttpError("Not shortcuts found", 404);
  }

  return shortcutsFound;
}

export async function getShortcut(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const shortcutFound = await shortcutModel.findOne({
    user: userId,
    _id: paramsId,
  });

  if (!shortcutFound) {
    throw new HttpError("Shortcut not found", 404);
  }

  return shortcutFound;
}

export async function createShortcut(
  data: Shortcut & { userId: mongoose.Schema.Types.ObjectId }
) {
  const newShortcut = new shortcutModel({ ...data, user: data.userId });

  return newShortcut.save();
}

export async function deleteShortcut(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const shortcutFound = await shortcutModel.findOneAndDelete({
    user: userId,
    _id: paramsId,
  });

  if (!shortcutFound) {
    throw new HttpError("Shortcurt not found", 404);
  }

  return shortcutFound;
}

export async function updateShortcut(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string,
  bodyUpdate: Shortcut
) {
  const shortcutFound = await shortcutModel.findOneAndUpdate(
    { user: userId, _id: paramsId },
    bodyUpdate,
    { new: true }
  );

  if (!shortcutFound) {
    throw new HttpError("Shortcut not found", 404);
  }

  return shortcutFound;
}
