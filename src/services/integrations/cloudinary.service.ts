import { v2 as cloudinary } from "cloudinary";
import { EnvConfig } from "../../config/env.config";

const env = EnvConfig();

cloudinary.config({
  cloud_name: env.cloud_name,
  api_key: env.cloud_api_key,
  api_secret: env.cloud_api_secret,
  secure: true,
});

export async function cloudUpload(filePath: string, folder: string) {
  return await cloudinary.uploader.upload(filePath, { folder });
}

export async function cloudDelete(publicId: string) {
  return await cloudinary.uploader.destroy(publicId);
}
