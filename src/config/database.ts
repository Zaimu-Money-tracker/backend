import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri: string | undefined = process.env.MONGO_URI;

if (!uri) {
  throw new Error("Error connecting with database, can't find uri");
}

const conect = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("Succesfully conected to Zaimu's database");
  } catch (error) {
    const typedError = error as Error;

    console.log(
      "An error occurred while connecting to Zaimu's database: ",
      typedError.message
    );
  }
};

export default conect;
