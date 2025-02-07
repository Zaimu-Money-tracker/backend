import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { EnvConfig } from "../../config/env.config.js";
import {
  ForbiddenError,
  UnauthorizedError,
} from "../../utils/errors/custom/client.errors.js";

const env = EnvConfig();

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { access_token } = req.cookies;

    if (!access_token) {
      throw new UnauthorizedError("Authorization denied");
    } else {
      jwt.verify(
        access_token,
        env.jwt_secret_key,
        (
          err: jwt.VerifyErrors | null,
          decoded: JwtPayload | string | undefined
        ) => {
          if (err) {
            throw new ForbiddenError("Authorization denied");
          }

          req.user = decoded;
          next();
        }
      );
    }
  } catch (error) {
    const typedError = error as JwtPayload;

    console.error(typedError);
    next(typedError);
  }
}
