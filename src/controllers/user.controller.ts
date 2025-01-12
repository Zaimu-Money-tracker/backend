import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as userService from "../services/users.service.js";
import { HttpError } from "../utils/errors/http.error.js";
import * as cloudinaryService from "../services/cloudinary.service.js";
import fs from "fs-extra";
import User from "../interfaces/user.interface.js";

export async function getUser(req: Request, res: Response) {
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

export async function uploadUserPhoto(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;
    const userFound = await userService.getUserById(user.id);

    if (req.files) {
      const result = await cloudinaryService.cloudUpload(
        req.files.filepath,
        `users/${userFound._id}/profile`
      );
      const updatedUser: Partial<User> = {
        profilePhoto: {
          url: result.secure_url,
          id: result.public_id,
        },
      };

      await userService.updateUser(userFound._id, updatedUser);
    } else {
      res.status(404).json({ message: "No profile photo found" });
    }

    await fs.unlink(req.files.filepath);

    res
      .status(200)
      .json({ message: "Profile photo was uploaded successfully" });
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred during upload",
      error: typedError.message,
    });
  }
}
