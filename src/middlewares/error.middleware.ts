import { Request, Response, NextFunction } from "express";
import HttpError from "../interfaces/errors/httpError.js";
import { BaseHttpError } from "../utils/errors/app.error.js";

export const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) next();

  if (err instanceof BaseHttpError) {
    const { name, message, statusCode } = err;
    res.status(statusCode).json({ name: name, message: message });
  }

  res.status(500).json({
    name: "Internal Server Error",
    message: "Oops, something went wrong",
  });
};
