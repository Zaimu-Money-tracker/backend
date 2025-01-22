import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conect = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("An unexpected error has occurred");
    }

    const uri: string = process.env.MONGO_URI;

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
