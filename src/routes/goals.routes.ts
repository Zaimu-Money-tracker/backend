import express, { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import {
  createGoal,
  deleteGoal,
  getGoal,
  getGoals,
  updateGoal,
} from "../controllers/goals.controller.js";

const router: Router = express.Router();

router.get("/", validateToken, getGoals);
router.get("/:id", validateToken, getGoal);
router.post("/", validateToken, createGoal);
router.delete("/:id", validateToken, deleteGoal);
router.put("/:id", validateToken, updateGoal);

export default router;
