import User from "../interfaces/user.interface.js";
import userModel from "../models/user.model.js";

export async function createUser(data: User & { passwordHash: string }) {
  const newUser = new userModel({
    ...data,
    password: data.passwordHash,
  });

  return await newUser.save();
}

export async function findUser(email: string) {
  return await userModel.findOne({ email });
}
