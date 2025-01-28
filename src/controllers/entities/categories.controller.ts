import { NextFunction, Request, Response } from "express";
import * as categoriesService from "../../services/entities/categories.service.js";
import { JwtPayload } from "jsonwebtoken";
import { NotFoundError } from "../../utils/errors/custom/client.errors.js";

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const categoriesFound = await categoriesService.getAllCategories(user.id);

    if (!categoriesFound) throw new NotFoundError("No categories found");

    res.status(200).json(categoriesFound);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function getCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const categoryFound = await categoriesService.getCategory(
      user.id,
      req.params.id
    );

    if (!categoryFound) throw new NotFoundError("Category not found");

    res.status(200).json(categoryFound);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    await categoriesService.createCategory({
      ...req.body,
      userId: user.id,
    });

    res.status(200).send("Category created successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const categoryFound = await categoriesService.deleteCategory(
      user.id,
      req.params.id
    );

    if (!categoryFound) throw new NotFoundError("Category not found");

    res.status(200).send("Category deleted successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const categoryFound = await categoriesService.updateCategory(
      user.id,
      req.params.id,
      req.body
    );

    if (!categoryFound) throw new NotFoundError("Category not found");

    res.status(200).send("Caregory updated successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}
