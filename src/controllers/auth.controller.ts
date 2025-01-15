import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { accessToken } from "../libs/jwt.js";
import User from "../interfaces/user.interface.js";
import * as authService from "../services/auth.service.js";
import { HttpError } from "../utils/errors/http.error.js";
import userModel from "../models/user.model.js";

export async function register(req: Request, res: Response) {
  try {
    const { password }: User = req.body;

    const passwordHash: string = await bcrypt.hash(password, 15);

    const newUser = await authService.createUser({
      ...req.body,
      passwordHash,
    });

    const token: string = await accessToken({ id: newUser._id });

    res.cookie("access_token", token, {
      httpOnly: true,
      // secure: true, -> // FIXME: ONLY IN PRODUCTION
      sameSite: "strict",
    });
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred during register",
      error: typedError.message,
    });
    console.log("An error has occurred during register: ", typedError);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password }: User = req.body;

    const userFound = await authService.findUser(email);

    if (!userFound) {
      res.status(404).json({ message: "User not found" });
    }

    const matchPassword: boolean = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!matchPassword) {
      res.status(401).json({ message: "Invalid credentials, cannot login" });
    }

    const token: string = await accessToken({ id: userFound._id });

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    const typedError = error as Error;

    if (typedError instanceof HttpError) {
      res.status(typedError.statusCode).json({ message: typedError.message });
    } else {
      res.status(500).json({
        message: "An error has occurred during login",
        error: typedError.message,
      });
    }
  }
}

export async function logout(req: Request, res: Response) {
  try {
    // TODO: Remove line 80, just for testing in postman
    await userModel.deleteMany({});

    res.cookie("token", "", { expires: new Date(0) });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    const typedError = error as Error;

    res.status(500).json({
      message: "An error has occurred during logout",
      error: typedError.message,
    });
  }
}
