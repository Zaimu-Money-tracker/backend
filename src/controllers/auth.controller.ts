import { Request, Response } from "express";
import userModel from "../models/user.model.js";
import bcrtypt from "bcryptjs";
import { accessToken } from "../libs/jwt.js";
import User from "../interfaces/user.interface.js";

export async function register(req: Request, res: Response) {
  try {
    const { name, lastName, userName, age, email, password }: User = req.body;

    const passwordHash: string = await bcrtypt.hash(password, 15);

    const user = new userModel({
      name,
      lastName,
      userName,
      age,
      email,
      password: passwordHash,
    });

    const newUser = await user.save();

    const token: string = await accessToken({ id: newUser._id });

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    const typedError = error as Error;

    res
      .status(500)
      .json({ message: "Error posting data", error: typedError.message });
    console.log("Error posting data: ", typedError);
  }
}
