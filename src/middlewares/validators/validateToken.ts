import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { EnvConfig } from "../../config/env.config";

const env = EnvConfig();

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({ message: "Authorization denied" });
      throw new Error("Authorization denied");
    } else {
      jwt.verify(
        token,
        env.jwt_secret_key,
        (
          err: jwt.VerifyErrors | null,
          decoded: JwtPayload | string | undefined
        ) => {
          if (err) {
            return res.status(403).json({ message: "Authorization denied" });
          }

          req.user = decoded;
          next();
        }
      );
    }
  } catch (error) {
    const typedError = error as JwtPayload;

    res
      .status(500)
      .json({ message: "An error has ocurred", error: typedError.message });
  }
}
