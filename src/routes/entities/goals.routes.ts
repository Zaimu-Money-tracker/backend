import express, { Router } from "express";
import validateToken from "../../middlewares/validators/validateToken.js";
import * as goals from "../../controllers/entities/goals.controller.js";
import { validator } from "../../middlewares/validators/validator.middleware.js";
import { createGoalScheme } from "../../schemas/entities/goal.schema.js";

const router: Router = express.Router();

router.get("/", validateToken, goals.getGoals);
router.get("/:id", validateToken, goals.getGoal);
router.post("/", validateToken, validator(createGoalScheme), goals.createGoal);
router.delete("/:id", validateToken, goals.deleteGoal);
router.put("/:id", validateToken, goals.updateGoal);

export default router;
