import mongoose from "mongoose";
import shortcutModel from "../../models/entities/shortcut.model.js";
import Shortcut from "../../interfaces/entities/shortcut.interface.js";

export async function getAllShortcuts(userId: mongoose.Schema.Types.ObjectId) {
  const shortcutsFound = await shortcutModel
    .find({ user: userId })
    .populate("user")
    .populate("category");

  return shortcutsFound;
}

export async function getShortcut(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const shortcutFound = await shortcutModel
    .findOne({
      user: userId,
      _id: paramsId,
    })
    .populate("user")
    .populate("category");

  return shortcutFound;
}

export async function createShortcut(
  data: Shortcut & { userId: mongoose.Schema.Types.ObjectId }
) {
  const newShortcut = new shortcutModel({ ...data, user: data.userId });

  return await newShortcut.save();
}

export async function deleteShortcut(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const shortcutFound = await shortcutModel.findOneAndDelete({
    user: userId,
    _id: paramsId,
  });

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

  return shortcutFound;
}
