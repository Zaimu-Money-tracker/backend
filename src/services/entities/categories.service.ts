import mongoose from "mongoose";
import Category from "../../interfaces/entities/category.interface.js";
import categoryModel from "../../models/entities/category.model.js";

export async function getAllCategories(userId: mongoose.Schema.Types.ObjectId) {
  const categoriesFound = await categoryModel
    .find({ user: userId })
    .populate("user");

  return categoriesFound;
}

export async function getCategory(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const categoryFound = await categoryModel
    .findOne({
      user: userId,
      _id: paramsId,
    })
    .populate("user");

  return categoryFound;
}

export async function createCategory(
  data: Category & { userId: mongoose.Schema.Types.ObjectId }
) {
  const newCategory = new categoryModel({
    ...data,
    user: data.userId,
  });

  return await newCategory.save();
}

export async function deleteCategory(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const categoryFound = await categoryModel.findOneAndDelete({
    user: userId,
    _id: paramsId,
  });

  return categoryFound;
}

export async function updateCategory(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string,
  bodyUpdate: Category
) {
  const categoryFound = await categoryModel.findOneAndUpdate(
    { user: userId, _id: paramsId },
    bodyUpdate,
    { new: true }
  );

  return categoryFound;
}
