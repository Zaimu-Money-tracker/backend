import { z } from "zod";

export const envScheme = z.object({
  SERVER_PORT: z.string().transform((val) => parseInt(val)),
  MONGO_URI: z.string(),
  JWT_SECRET_KEY: z.string(),
  CLOUD_NAME: z.string(),
  CLOUD_API_KEY: z.string(),
  CLOUD_API_SECRET: z.string(),
});
