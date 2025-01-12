import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as userService from "../services/users.service.js";
import { HttpError } from "../utils/errors/http.error.js";
import * as cloudinaryService from "../services/cloudinary.service.js";
import fs from "fs-extra";

export async function user(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const userFound = await userService.getUserById(user.id);

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

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          message: "An error has occurred, cannot get user",
          error: typedError.message,
        }),
        console.log("An error has occurred, cannot get user: ", typedError));
  }
}

export async function upload(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;
    const { _id } = await userService.getUserById(user.id);

    if (req.files) {
      await cloudinaryService.cloudUpload(
        req.files.filepath,
        `users/${_id}/profile`
      );
    } else {
      res.status(404).json({ message: "No profile photo found" });
    }

    await fs.unlink(req.files.filepath);

    res
      .status(200)
      .json({ message: "Profile pucture was uploaded successfully" });
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred during upload",
      error: typedError.message,
    });
  }
}
