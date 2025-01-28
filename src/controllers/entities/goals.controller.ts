import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as goalsService from "../../services/entities/goals.service.js";
import { NotFoundError } from "../../utils/errors/custom/client.errors.js";

export async function getGoals(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const goalsFound = await goalsService.getAllGoals(user.id);

    if (!goalsFound) throw new NotFoundError("No goals found");

    res.status(200).json(goalsFound);
  } catch (error) {
    const typedError = error as JwtPayload;

    console.error(typedError);
    return next(typedError);
  }
}

export async function getGoal(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as JwtPayload;

    const goalFound = await goalsService.getGoal(user.id, req.params.id);

    if (!goalFound) throw new NotFoundError("Goal not found");

    res.status(200).json(goalFound);
  } catch (error) {
    const typedError = error as JwtPayload;

    console.error(typedError);
    return next(typedError);
  }
}

export async function createGoal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    await goalsService.createGoal({
      ...req.body,
      userId: user.id,
    });

    res.status(200).send("Goal created successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function deleteGoal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const goalFound = await goalsService.deleteGoal(user.id, req.params.id);

    if (!goalFound) throw new NotFoundError("Goal not found");

    res.status(200).send("Goal deleted successfully");
  } catch (error) {
    const typedError = error as JwtPayload;

    console.error(typedError);
    return next(typedError);
  }
}

export async function updateGoal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const goalFound = await goalsService.updateGoal(
      user.id,
      req.params.id,
      req.body
    );

    if (!goalFound) throw new NotFoundError("Goal not found");

    res.status(200).send("Goal updated successfully");
  } catch (error) {
    const typedError = error as JwtPayload;

    console.error(typedError);
    return next(typedError);
  }
}
