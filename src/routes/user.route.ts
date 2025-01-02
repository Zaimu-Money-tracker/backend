import userModel from "../models/user.model.js";
import express, { Request, Response } from "express";
import User from "../interfaces/user.interface.js";
import { register } from "../controllers/auth.controller.js";

const router = express.Router();

// Get all users from database
router.get("/", async (req: Request, res: Response) => {
  try {
    const data: User[] = await userModel.find();

    !data
      ? res.status(404).json({ message: "Users not found" })
      : res.status(200).json(data);
  } catch (error) {
    const typedError = error as Error;

    res
      .status(500)
      .json({ message: "Error getting data", error: typedError.message });
    console.log("Error getting data: ", typedError);
  }
});

// Add users to database
router.post("/register", register);

export default router;
