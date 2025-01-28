import { NextFunction, Request, Response } from "express";
import * as shortcutService from "../../services/entities/shortcuts.service.js";
import { JwtPayload } from "jsonwebtoken";
import { NotFoundError } from "../../utils/errors/custom/client.errors.js";

export async function getShortcuts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const shortcutsFound = await shortcutService.getAllShortcuts(user.id);

    if (!shortcutsFound) throw new NotFoundError("Not shortcuts found");

    res.status(200).json(shortcutsFound);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function getShortcut(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const shortcutFound = await shortcutService.getShortcut(
      user.id,
      req.params.id
    );

    if (!shortcutFound) throw new NotFoundError("Shortcut not found");

    res.status(200).json(shortcutFound);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function createShortcut(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    await shortcutService.createShortcut({
      ...req.body,
      userId: user.id,
    });

    res.status(200).send("Shortcut created successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function deleteShortcut(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const shortcutFound = await shortcutService.deleteShortcut(
      user.id,
      req.params.id
    );

    if (!shortcutFound) throw new NotFoundError("Shortcut not found");

    res.status(200).send("Shortcut deleted successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}

export async function updateShortcut(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as JwtPayload;

    const shortcutFound = await shortcutService.updateShortcut(
      user.id,
      req.params.id,
      req.body
    );

    if (!shortcutFound) throw new NotFoundError("Shortcut not found");

    res.status(200).send("Shortcut updated successfully");
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    return next(typedError);
  }
}
