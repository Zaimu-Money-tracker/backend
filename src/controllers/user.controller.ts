import { Request, Response } from "express";
import userModel from "../models/user.model.js";
import { JwtPayload } from "jsonwebtoken";

export async function user(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const userFound = await userModel.findById(user.id);

    if (!userFound) {
      return (
        res.status(404).json({ message: "User not found" }),
        console.log("User not found")
      );
    }

    res.status(200).json({
      name: userFound.name,
      lastName: userFound.lastName,
      userName: userFound.userName,
      profilePhoto: userFound.profilePhoto,
      profession: userFound.profession,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred, cannot get user",
      error: typedError.message,
    });
    console.log("An error has occurred, cannot get user");
  }
}
