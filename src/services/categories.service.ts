import mongoose from "mongoose";
import Category from "../interfaces/category.interface.js";
import categoryModel from "../models/category.model.js";
import { HttpError } from "../utils/errors/http.error.js";

export async function getAllCategories(userId: mongoose.Schema.Types.ObjectId) {
  const categoriesFound = await categoryModel.find({ user: userId });

  if (!categoriesFound) {
    throw new HttpError("No categories found", 404);
  }

  return categoriesFound;
}

export async function getCategory(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const categoryFound = await categoryModel.findOne({
    user: userId,
    _id: paramsId,
  });

  if (!categoryFound) {
    throw new HttpError("Category not found", 404);
  }

  return categoryFound;
}

export async function createCategory(
  data: Category & { userId: mongoose.Schema.Types.ObjectId }
) {
  const newCategory = new categoryModel({
    ...data,
    user: data.userId,
  });

  return newCategory.save();
}

export async function deleteCategory(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const categoryFound = await categoryModel.findOneAndDelete({
    user: userId,
    _id: paramsId,
  });

  if (!categoryFound) {
    throw new HttpError("Category not found, cannot delete", 404);
  }

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

  if (!categoryFound) {
    throw new HttpError("Category not found, cannot update", 404);
  }

  return categoryFound;
}
