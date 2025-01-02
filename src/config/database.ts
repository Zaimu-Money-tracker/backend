import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri: string | undefined = process.env.MONGO_URI;

if (!uri) {
  throw new Error("Can't find the database uri");
}

const conect = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("Succesfully conected to Zaimu's database");
  } catch (error) {
    const typedError = error as Error;

    console.log(
      "An error occurred while connecting to database: ",
      typedError.message
    );
  }
};

export default conect;
