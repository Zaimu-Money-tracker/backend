import express, { Router } from "express";
import validateToken from "../../middlewares/validators/validateToken.js";
import * as transactions from "../../controllers/entities/transactions.controller.js";
import { validator } from "../../middlewares/validators/validator.middleware.js";
import { createTransactionSchema } from "../../schemas/entities/transaction.schema.js";

const router: Router = express.Router();

router.get("/", validateToken, transactions.getTransactions);
router.get("/item/:id", validateToken, transactions.getTransaction);
router.get("/incomes", validateToken, transactions.getIncomes);
router.get("/expenses", validateToken, transactions.getExpenses);
router.post(
  "/",
  validateToken,
  validator(createTransactionSchema),
  transactions.createTransaction
);
router.delete("/item/:id", validateToken, transactions.deleteTransaction);
router.put("/item/:id", validateToken, transactions.updateTransaction);

export default router;
