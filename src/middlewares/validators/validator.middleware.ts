import { NextFunction, Request, Response } from "express";
import { Schema, ZodError } from "zod";

export const validator =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const typedError = error as ZodError;

      res.status(400).json({ error: typedError.errors });
    }
  };
