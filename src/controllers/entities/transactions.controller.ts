import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as transactionsService from "../../services/entities/transactions.service.js";
import { NotFoundError } from "../../utils/errors/custom/client.errors.js";

export async function getTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionsService.getAllTransactions(
      user.id
    );

    if (!transactionsFound) throw new NotFoundError("No transactions found");

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function getTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const transactionFound = await transactionsService.getTransaction(
      user.id,
      req.params.id
    );

    if (!transactionFound) throw new NotFoundError("Transaction not found");

    res.status(200).json(transactionFound);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function getIncomes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionsService.getAllByType(
      user.id,
      "income"
    );

    if (!transactionsFound) throw new NotFoundError("No incomes found");

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function getExpenses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const transactionsFound = await transactionsService.getAllByType(
      user.id,
      "expense"
    );

    if (!transactionsFound) throw new NotFoundError("No expenses found");

    res.status(200).json(transactionsFound);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    await transactionsService.createTransaction({
      ...req.body,
      userId: user.id,
    });

    res.status(200).send("Transaction created successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function deleteTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const transactionFound = await transactionsService.deleteTransaction(
      user.id,
      req.params.id
    );

    if (!transactionFound) throw new NotFoundError("Transaction not found");

    res.status(200).send("Transaction deleted succesfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function updateTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const transactionFound = await transactionsService.updateTransaction(
      user.id,
      req.params.id,
      req.body
    );

    if (!transactionFound) throw new NotFoundError("Transaction not found");

    res.status(200).send("Transaction updated succesfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}
