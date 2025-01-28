import User from "../../interfaces/user/user.interface.js";
import userModel from "../../models/user/user.model.js";

export async function createUser(data: User & { password: string }) {
  const newUser = new userModel({
    ...data,
    password: data.password,
  });

  return await newUser.save();
}

export async function findUser(email: string) {
  return await userModel.findOne({ email });
}
