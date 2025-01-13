import { Request, Response } from "express";
import * as categoriesService from "../services/categories.service.js";
import { HttpError } from "../utils/errors/http.error.js";
import { JwtPayload } from "jsonwebtoken";

export async function getCategories(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const categoriesFound = await categoriesService.getAllCategories(user.id);

    res.status(200).json(categoriesFound);
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : res.status(500).json({
          message: "An error has occurred, cannot get categories",
          error: typedError.message,
        });
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const categoryFound = await categoriesService.getCategory(
      user.id,
      req.params.id
    );

    res.status(200).json(categoryFound);
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : res.status(500).json({
          message: "An error has occurred, cannot get category",
          error: typedError.message,
        });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await categoriesService.createCategory({
      ...req.body,
      userId: user.id,
    });

    res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : res.status(500).json({
          message: "An error has occurred while crating category",
          error: typedError.message,
        });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await categoriesService.deleteCategory(user.id, req.params.id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : res.status(500).json({
          message: "An error has occurred while deleting category",
          error: typedError.message,
        });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await categoriesService.updateCategory(user.id, req.params.id, req.body);

    res.status(200).json({ message: "Caregory updated successfully" });
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : res.status(500).json({
          message: "An error has occurred while updating category",
          error: typedError.message,
        });
  }
}
