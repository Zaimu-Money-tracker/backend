import express, { Router } from "express";
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

const router: Router = express.Router();

router.get("/", validateToken, getTransactions);
router.get("/item/:id", validateToken, getTransaction);
router.get("/incomes", validateToken, getIncomes);
router.get("/expenses", validateToken, getExpenses);
router.post("/", validateToken, createTransaction);
router.delete("/item/:id", validateToken, deleteTransaction);
router.put("/item/:id", validateToken, updateTransaction);

export default router;
