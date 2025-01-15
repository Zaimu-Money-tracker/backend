import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as transactionsService from "../services/transactions.service.js";
import { HttpError } from "../utils/errors/http.error.js";

export async function getTransactions(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionsService.getAllTransactions(
      user.id
    );

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    if (typedError instanceof HttpError) {
      res.status(typedError.statusCode).json({ message: typedError.message });
    } else {
      res
        .status(500)
        .json({ message: "An error has occurred, cannot get transactions" });
    }
  }
}

export async function getTransaction(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionsService.getTransaction(
      user.id,
      req.params.id
    );

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    if (typedError instanceof HttpError) {
      res.status(typedError.statusCode).json({ message: typedError.message });
    } else {
      res.status(500).json({
        message: "An error has occurred, cannot get transaction",
        error: typedError.message,
      });
    }
  }
}

export async function getIncomes(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionsService.getAllByType(
      user.id,
      "income"
    );

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    if (typedError instanceof HttpError) {
      res.status(typedError.statusCode).json({ message: typedError.message });
    } else {
      res.status(500).json({
        message: "An error has occurred, cannot get incomes",
        error: typedError.message,
      });
    }
  }
}

export async function getExpenses(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionsService.getAllByType(
      user.id,
      "expense"
    );

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    if (typedError instanceof HttpError) {
      res.status(typedError.statusCode).json({ message: typedError.message });
    } else {
      res.status(500).json({
        message: "An error has occurred, cannot get expenses",
        error: typedError.message,
      });
    }
  }
}

export async function createTransaction(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await transactionsService.createTransaction({
      ...req.body,
      userId: user.id,
    });

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

    await transactionsService.deleteTransaction(user.id, req.params.id);
    res.status(200).json({ message: "Transaction deleted succesfully" });
  } catch (error) {
    const typedError = error as Error;

    if (typedError instanceof HttpError) {
      res.status(typedError.statusCode).json({ message: typedError.message });
    } else {
      res.status(500).json({
        message: "An error has occurred while deleting transaction",
        error: typedError.message,
      });
    }
  }
}

export async function updateTransaction(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await transactionsService.updateTransaction(
      user.id,
      req.params.id,
      req.body
    );

    res.status(200).json({ message: "Transaction updated succesfully" });
  } catch (error) {
    const typedError = error as Error;

    if (typedError instanceof HttpError) {
      res.status(typedError.statusCode).json({ message: typedError.message });
    } else {
      res.status(500).json({
        message: "An error has occurred while updating transaction",
        error: typedError.message,
      });
    }
  }
}
