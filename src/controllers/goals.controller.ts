import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as goalsService from "../services/goals.service.js";

export async function getGoals(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const goalsFound = await goalsService.getAllGoals(user.id);

    if (!goalsFound) {
      return (
        res.status(404).json({ message: "Goals not found" }),
        console.log("Goals not found")
      );
    }

    res.status(200).json(goalsFound);
  } catch (error) {
    const typedError = error as JwtPayload;

    res.status(500).json({
      message: "An error has occurred, cannot get goals",
      error: typedError.message,
    });
    console.log("An error has occurred, cannot get goals: ", typedError);
  }
}

export async function getGoal(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const goalFound = await goalsService.getGoal(user.id, req.params.id);

    if (!goalFound) {
      return (
        res.status(404).json({ message: "Goal not found" }),
        console.log("Goal not found")
      );
    }

    res.status(200).json(goalFound);
  } catch (error) {
    const typedError = error as JwtPayload;

    res.status(500).json({
      messaage: "An error has occurred, cannot get goal",
      error: typedError.message,
    });
    console.log("An error has occurred, cannot get goal: ", typedError);
  }
}

export async function createGoal(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await goalsService.createGoal({
      ...req.body,
      user: user.id,
    });

    res.status(200).json({ message: "Goal created successfully" });
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred while creating goal",
      error: typedError.message,
    });
    console.log("An error has occurred while creating goal: ", typedError);
  }
}

export async function deleteGoal(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const goalFound = await goalsService.deleteGoal(user.id, req.params.id);

    if (!goalFound) {
      return (
        res.status(404).json({ message: "Goal not found, cannot delete" }),
        console.log("Goal not found, cannot delete")
      );
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    const typedError = error as JwtPayload;

    res.status(500).json({
      message: "An error has occurred while deleting goal",
      error: typedError.message,
    });
    console.log("An error has occurred while deleting goal: ", typedError);
  }
}

export async function updateGoal(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const goalFound = await goalsService.updateGoal(
      user.id,
      req.params.id,
      req.body
    );

    if (!goalFound) {
      return (
        res.status(404).json({ message: "Goal not found, cannot update" }),
        console.log("Goal not found, cannot update")
      );
    }

    res.status(200).json({ message: "Goal updated successfully" });
  } catch (error) {
    const typedError = error as JwtPayload;

    res.status(500).json({
      message: "An error has occurred while updating goal",
      error: typedError.message,
    });
    console.log("An error has occurred while updating goal: ", typedError);
  }
}
