import mongoose from "mongoose";
import transactionModel from "../../models/entities/transaction.model.js";
import Transaction from "../../interfaces/entities/transaction.interface.js";
import { HttpError } from "../../utils/errors/http.error.js";

export async function getAllTransactions(
  userId: mongoose.Schema.Types.ObjectId
) {
  const transactionFound = await transactionModel
    .find({ user: userId })
    .populate("user")
    .populate("category");

  if (!transactionFound) {
    throw new HttpError("No transactions found", 404);
  }

  return transactionFound;
}

export async function getTransaction(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const transactionFound = await transactionModel
    .findOne({ user: userId, _id: paramsId })
    .populate("user")
    .populate("category");

  if (!transactionFound) {
    throw new HttpError("Transaction not found", 404);
  }

  return transactionFound;
}

export async function getAllByType(
  userId: mongoose.Schema.Types.ObjectId,
  type: string
) {
  const transactionFound = await transactionModel
    .find({ user: userId, type: type })
    .populate("user")
    .populate("category");

  if (!transactionFound) {
    throw new HttpError(`${type} not found`, 404);
  }

  return transactionFound;
}

export async function createTransaction(
  data: Transaction & { userId: mongoose.Schema.Types.ObjectId }
) {
  const newTransaction = new transactionModel({
    ...data,
    user: data.userId,
  });

  return await newTransaction.save();
}

export async function deleteTransaction(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  const transactionFound = await transactionModel.findOneAndDelete({
    user: userId,
    _id: paramsId,
  });

  if (!transactionFound) {
    throw new HttpError("Transaction not found, cannot delete", 404);
  }

  return transactionFound;
}

export async function updateTransaction(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string,
  bodyUpdate: Transaction
) {
  const transactionFound = await transactionModel.findOneAndUpdate(
    { user: userId, _id: paramsId },
    bodyUpdate,
    { new: true }
  );

  if (!transactionFound) {
    throw new HttpError("Transaction not found, cannot update", 404);
  }

  return transactionFound;
}
