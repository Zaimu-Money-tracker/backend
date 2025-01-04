import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY ?? "falsekey1234";

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;

  if (!token) {
    return (
      res.status(401).json({ message: "Authorization denied" }),
      console.log("Authorization denied")
    );
  } else {
    jwt.verify(
      token,
      SECRET_KEY,
      (
        err: jwt.VerifyErrors | null,
        decoded: JwtPayload | string | undefined
      ) => {
        if (err) {
          return (
            res.status(403).json({ message: "Authorization denied" }),
            console.log("Authorization denied")
          );
        }

        req.user = decoded;
        next();
      }
    );
  }
}
