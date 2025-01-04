import express from "express";
import validateToken from "../middlewares/validateToken.js";
import {
  createTransaction,
  deleteTransaction,
  getExpenses,
  getIncomes,
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transaction.controller.js";

const route = express.Router();

route.get("/transactions", validateToken, getTransactions);
route.get("/transactions/:id", validateToken, getTransaction);
route.get("/transactions/incomes", validateToken, getIncomes);
route.get("/transactions/expenses", validateToken, getExpenses);
route.post("/transactions", validateToken, createTransaction);
route.delete("/transactions/:id", validateToken, deleteTransaction);
route.put("/transactions/:id", validateToken, updateTransaction);

export default route;
