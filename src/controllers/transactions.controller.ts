import { Request, Response } from "express";
import Transaction from "../interfaces/transaction.interface.js";
import transactionModel from "../models/transaction.model.js";
import { JwtPayload } from "jsonwebtoken";

export async function getTransactions(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionModel
      .find({ user: user.id })
      .populate("user");

    if (!transactionsFound) {
      return (
        res.status(404).json({ message: "Transactions not found" }),
        console.log("Transactions not found")
      );
    }

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    res
      .status(500)
      .json({ message: "An error has occurred, cannot get transactions" });
    console.log("An error has occurred, cannot get transactions: ", typedError);
  }
}

export async function getTransaction(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionModel
      .findOne({ user: user.id, _id: req.params.id })
      .populate("user");

    if (!transactionsFound) {
      return (
        res.send(404).json({ message: "Transaction not found" }),
        console.log("Transaction not found")
      );
    }

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred, cannot get transaction",
      error: typedError.message,
    });
    console.log("An error has occurred, cannot get transaction:", typedError);
  }
}

export async function getIncomes(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionModel
      .find({ user: user.id, type: "income" })
      .populate("user");

    if (!transactionsFound) {
      return (
        res.status(404).json({ message: "Incomes not found" }),
        console.log("Incomes not found")
      );
    }

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred, cannot get incomes",
      error: typedError.message,
    });
    console.log("An error has occurred, cannot get incomes:", typedError);
  }
}

export async function getExpenses(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionModel
      .find({ user: user.id, type: "expense" })
      .populate("user");

    if (!transactionsFound) {
      return (
        res.status(404).json({ message: "Expenses not found" }),
        console.log("Expenses not found")
      );
    }

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred, cannot get expenses",
      error: typedError.message,
    });
    console.log("An error has occurred, cannot get expenses");
  }
}

export async function createTransaction(req: Request, res: Response) {
  try {
    const {
      type,
      ammount,
      name,
      category,
      image,
      description,
      date,
    }: Transaction = req.body;

    const user = req.user as JwtPayload;

    const newTransaction = new transactionModel({
      type,
      ammount,
      name,
      category,
      image,
      description,
      date,
      user: user.id,
    });

    if (!newTransaction) {
      return (
        res.status(404).json({ message: "Transaction not found" }),
        console.log("Transaction not found")
      );
    }

    await newTransaction.save();

    res.status(200).json({ message: "Transaction created successfully" });
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred while creating transaction",
      error: typedError.message,
    });
    console.log(
      "An error has occurred while creating transaction: ",
      typedError
    );
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionFound: Transaction | null =
      await transactionModel.findOneAndDelete({
        user: user.id,
        _id: req.params.id,
      });

    if (!transactionFound) {
      return (
        res.send(404).json({ message: "Transaction not found, cannot delete" }),
        console.log("Transaction not found, cannot delete")
      );
    }

    res.status(200).json({ message: "Transaction deleted succesfully" });
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred while deleting transaction",
      error: typedError.message,
    });
    console.log(
      "An error has occurred while deleting transaction: ",
      typedError
    );
  }
}

export async function updateTransaction(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionFound: Transaction | null =
      await transactionModel.findOneAndUpdate(
        { user: user.id, _id: req.params.id },
        req.body,
        { new: true }
      );

    if (!transactionFound) {
      return (
        res.send(404).json({ message: "Transaction not found, cannot update" }),
        console.log("Transaction not found, cannot update")
      );
    }

    res.status(200).json({ message: "Transaction updated succesfully" });
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred while updating transaction",
      error: typedError.message,
    });
    console.log(
      "An error has occurred while updating transaction: ",
      typedError
    );
  }
}
