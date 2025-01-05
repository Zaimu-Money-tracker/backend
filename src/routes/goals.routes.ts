import express, { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import * as goals from "../controllers/goals.controller.js";

const router: Router = express.Router();

router.get("/", validateToken, goals.getGoals);
router.get("/:id", validateToken, goals.getGoal);
router.post("/", validateToken, goals.createGoal);
router.delete("/:id", validateToken, goals.deleteGoal);
router.put("/:id", validateToken, goals.updateGoal);

export default router;
