import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { accessToken } from "../../libs/jwt.js";
import User from "../../interfaces/user/user.interface.js";
import * as authService from "../../services/auth/auth.service.js";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/errors/custom/client.errors.js";
import { EnvConfig } from "../../config/env.config.js";

const env = EnvConfig();

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { password, email }: User = req.body;

    const passwordHash: string = await bcrypt.hash(password, 10);
    const foundUser = await authService.findUser(email);

    if (foundUser) throw new ConflictError("User already exist");

    const newUser = await authService.createUser({
      ...req.body,
      password: passwordHash,
    });

    const token: string = await accessToken({ id: newUser._id });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: env.node === "production",
      sameSite: "strict",
    });

    res.status(200).send("User created successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password }: User = req.body;

    const userFound = await authService.findUser(email);

    if (!userFound) throw new NotFoundError("User not found");

    const matchPassword: boolean = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!matchPassword) throw new UnauthorizedError("Invalid credentials");

    const token: string = await accessToken({ id: userFound._id });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: env.node === "production",
      sameSite: "strict",
    });
    res.status(200).send("Logged in successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.cookie("access_token", "", { expires: new Date(0) });
    res.status(200).send("User logged out successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}
