import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { EnvConfig } from "../config/env.config";

const env = EnvConfig();

export function accessToken(payload: JwtPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const options: SignOptions = { expiresIn: "120d" };

      jwt.sign(payload, env.jwt_secret_key, options, (err, token) => {
        if (err) {
          reject(err);
        } else if (token) {
          resolve(token);
        } else {
          reject(new Error("Token generation failed"));
        }
      });
    } catch (error) {
      const typedError = error as Error;

      reject(new Error(typedError.message));
    }
  });
}
