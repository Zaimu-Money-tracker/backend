import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("An unexpected error has occurred");
    }

    const SECRET_KEY: string = process.env.JWT_SECRET_KEY;
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Authorization denied" });
    } else {
      jwt.verify(
        token,
        SECRET_KEY,
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
