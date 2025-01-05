import mongoose from "mongoose";
import transactionModel from "../models/transaction.model.js";
import Transaction from "../interfaces/transaction.interface.js";

export async function getAllTransactions(
  userId: mongoose.Schema.Types.ObjectId
) {
  return await transactionModel.find({ user: userId }).populate("user");
}

export async function getTransaction(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string
) {
  return await transactionModel
    .findOne({ user: userId, _id: paramsId })
    .populate("user");
}

export async function getAllByType(
  userId: mongoose.Schema.Types.ObjectId,
  type: string
) {
  return await transactionModel
    .find({ user: userId, type: type })
    .populate("user");
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
  return await transactionModel.findOneAndDelete({
    user: userId,
    _id: paramsId,
  });
}

export async function updateTransaction(
  userId: mongoose.Schema.Types.ObjectId,
  paramsId: string,
  bodyUpdate: Transaction
) {
  return await transactionModel.findOneAndUpdate(
    { user: userId, _id: paramsId },
    bodyUpdate,
    { new: true }
  );
}
