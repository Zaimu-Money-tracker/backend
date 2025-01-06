import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as goalsService from "../services/goals.service.js";
import { HttpError } from "../utils/errors/http.error.js";

export async function getGoals(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const goalsFound = await goalsService.getAllGoals(user.id);

    res.status(200).json(goalsFound);
  } catch (error) {
    const typedError = error as JwtPayload;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          message: "An error has occurred, cannot get goals",
          error: typedError.message,
        }),
        console.log("An error has occurred, cannot get goals: ", typedError));
  }
}

export async function getGoal(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const goalFound = await goalsService.getGoal(user.id, req.params.id);

    res.status(200).json(goalFound);
  } catch (error) {
    const typedError = error as JwtPayload;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          messaage: "An error has occurred, cannot get goal",
          error: typedError.message,
        }),
        console.log("An error has occurred, cannot get goal: ", typedError));
  }
}

export async function createGoal(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await goalsService.createGoal({
      ...req.body,
      userId: user.id,
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

    await goalsService.deleteGoal(user.id, req.params.id);
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    const typedError = error as JwtPayload;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          message: "An error has occurred while deleting goal",
          error: typedError.message,
        }),
        console.log("An error has occurred while deleting goal: ", typedError));
  }
}

export async function updateGoal(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await goalsService.updateGoal(user.id, req.params.id, req.body);
    res.status(200).json({ message: "Goal updated successfully" });
  } catch (error) {
    const typedError = error as JwtPayload;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          message: "An error has occurred while updating goal",
          error: typedError.message,
        }),
        console.log("An error has occurred while updating goal: ", typedError));
  }
}
