import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY ?? "falsekey1234";

export function accessToken(payload: JwtPayload): Promise<string> {
  return new Promise((resolve, reject) => {
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
  });
}
