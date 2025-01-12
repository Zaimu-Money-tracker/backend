import { v2 as cloudinary } from "cloudinary";
import dotnev from "dotenv";

dotnev.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function cloudUpload(filePath: string, folder: string) {
  return await cloudinary.uploader.upload(filePath, { folder });
}
