import { Request, Response } from "express";
import goalModel from "../models/goal.model.js";
import { JwtPayload } from "jsonwebtoken";
import Goal from "../interfaces/goal.interface.js";

export async function getGoals(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const goalsFound = await goalModel.find({ user: user.id }).populate("user");

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

    const goalFound = await goalModel
      .findOne({ user: user.id, _id: req.params.id })
      .populate("user");

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
    const { name, image, description, progress, goal }: Goal = req.body;

    const user = req.user as JwtPayload;

    const newGoal = new goalModel({
      name,
      image,
      description,
      progress,
      goal,
      user: user.id,
    });

    if (!newGoal) {
      return (
        res.status(404).json({ message: "Goal not found" }),
        console.log("Goal not found")
      );
    }

    await newGoal.save();

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

    const goalFound: Goal | null = await goalModel.findOneAndDelete({
      user: user.id,
      _id: req.params.id,
    });

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

    const goalFound: Goal | null = await goalModel.findOneAndUpdate(
      { user: user.id, _id: req.params.id },
      req.body,
      { new: true }
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
