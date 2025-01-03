import { Request, Response } from "express";
import userModel from "../models/user.model.js";
import { JwtPayload } from "jsonwebtoken";

export async function user(req: Request, res: Response) {
  const user = req.user as JwtPayload | undefined;

  if (!user) {
    return (
      res.status(404).json({ message: "User not found" }),
      console.log("User not found")
    );
  }

  const userFound = await userModel.findById(user.id);

  if (!userFound) {
    return (
      res.status(404).json({ message: "User not found" }),
      console.log("User not found")
    );
  }

  res.status(200).json([
    { message: "User found successfully" },
    {
      name: userFound.name,
      lastName: userFound.lastName,
      userName: userFound.userName,
      age: userFound.age,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    },
  ]);
}
