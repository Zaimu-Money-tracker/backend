import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as userService from "../../services/user/users.service.js";
import * as cloudinaryService from "../../services/integrations/cloudinary.service.js";
import fs from "fs-extra";
import User from "../../interfaces/user/user.interface.js";
import { NotFoundError } from "../../utils/errors/custom/client.errors.js";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as JwtPayload;

    const userFound = await userService.getUserById(user.id);

    if (!userFound) throw new NotFoundError("User not found");

    res.status(200).json({
      name: userFound.name,
      lastName: userFound.lastName,
      profilePhoto: userFound.profilePhoto,
      profession: userFound.profession,
      phoneNumber: userFound.phoneNumber,
      email: userFound.email,
      settings: userFound.settings,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function uploadUserPhoto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;
    const files = req.files as JwtPayload;

    const userFound = await userService.getUserById(user.id);

    if (!userFound) throw new NotFoundError("User not found");

    if (files) {
      const result = await cloudinaryService.cloudUpload(
        files.filepath,
        `users/${userFound._id}/profile`
      );

      const updatedUser: Partial<User> = {
        profilePhoto: {
          url: result.secure_url,
          id: result.public_id,
        },
      };

      const userUpdateFound = await userService.updateUser(
        userFound._id,
        updatedUser
      );

      if (!userUpdateFound) throw new NotFoundError("User not found");
    } else {
      throw new Error("No profile photo found");
    }

    if (!files.filepath) throw new Error("File path is not allowed!");

    await fs.unlink(files.filepath);

    res.status(200).send("Profile photo was uploaded successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}
