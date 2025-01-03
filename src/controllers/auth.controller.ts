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

export async function login(req: Request, res: Response) {
  try {
    const { email, password }: User = req.body;

    const userFound = await userModel.findOne({ email });

    if (!userFound) {
      return (
        res.status(404).json({ message: "User not found" }),
        console.log("User not found")
      );
    }

    const matchPassword: boolean = await bcrtypt.compare(
      password,
      userFound.password
    );

    if (!matchPassword) {
      return (
        res.status(401).json({ messagge: "Invalid credentials" }),
        console.log("User not found")
      );
    }

    const token: string = await accessToken({ id: userFound._id });

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    const typedError = error as Error;

    res
      .status(500)
      .json({ message: "Error posting data", error: typedError.message });
    console.log("Error posting data: ", typedError);
  }
}

export async function logout(req: Request, res: Response) {
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ messsages: "User logged out successfully" });
}
