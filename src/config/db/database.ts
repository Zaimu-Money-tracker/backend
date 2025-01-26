import mongoose from "mongoose";
import { EnvConfig } from "../env.config";

const env = EnvConfig();

const conect = async () => {
  try {
    const uri: string = env.mongo;

    await mongoose.connect(uri, {});
    console.log("Succesfully conected to Zaimu's database");
  } catch (error) {
    const typedError = error as Error;

    console.error(
      "An error occurred while connecting to Zaimu's database: ",
      typedError.message
    );
  }
};

export default conect;
