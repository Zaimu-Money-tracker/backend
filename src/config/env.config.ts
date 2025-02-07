import dotenv from "dotenv";
import { envScheme } from "../schemas/env/env.schema.js";

dotenv.config();

const parsedEnv = envScheme.parse(process.env);

const {
  SERVER_PORT: port,
  MONGO_URI: mongo,
  JWT_SECRET_KEY: jwt_secret_key,
  CLOUD_NAME: cloud_name,
  CLOUD_API_KEY: cloud_api_key,
  CLOUD_API_SECRET: cloud_api_secret,
  NODE_ENV: node,
} = parsedEnv;

export const EnvConfig = () => ({
  port,
  mongo,
  jwt_secret_key,
  cloud_name,
  cloud_api_key,
  cloud_api_secret,
  node,
});
