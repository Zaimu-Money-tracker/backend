import User from "../../interfaces/user/user.interface.js";
import userModel from "../../models/user/user.model.js";
import { HttpError } from "../../utils/errors/http.error.js";

export async function createUser(data: User & { passwordHash: string }) {
  if (!data.passwordHash) {
    throw new Error("Password hash is required");
  }

  const newUser = new userModel({
    ...data,
    password: data.passwordHash,
  });

  return await newUser.save();
}

export async function findUser(email: string) {
  const foundUser = await userModel.findOne({ email });

  if (!foundUser) {
    throw new HttpError("User not found", 404);
  }

  return foundUser;
}
