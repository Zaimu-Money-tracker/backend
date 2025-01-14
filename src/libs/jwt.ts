import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function accessToken(payload: JwtPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("An unexpected error has occurred");
      }

      const SECRET_KEY: string = process.env.JWT_SECRET_KEY;
      const options: SignOptions = { expiresIn: "120d" };

      jwt.sign(payload, SECRET_KEY, options, (err, token) => {
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
