import mongoose from "mongoose";
import { EnvConfig } from "../env.config.js";

const env = EnvConfig();

const conect = async () => {
  try {
    const uri: string = env.mongo;

    await mongoose.connect(uri, {});
    console.log("🔸 Succesfully conected to Zaimu's database");
  } catch (error) {
    const typedError = error as Error;

    console.error(`🔻 Oops, something went wrong: ${typedError}`);
  }
};

export default conect;
