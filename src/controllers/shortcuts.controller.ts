import { Request, Response } from "express";
import * as shortcutService from "../services/shortcuts.service.js";
import { JwtPayload } from "jsonwebtoken";
import { HttpError } from "../utils/errors/http.error.js";

export async function getShortcuts(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const shortcutsFound = await shortcutService.getAllShortcuts(user.id);

    res.status(200).json(shortcutsFound);
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          message: "An error has occurred, cannot get goals",
          error: typedError.message,
        }),
        console.log("An error has occurred, cannot get goals: ", typedError));
  }
}

export async function getShortcut(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    const shortcutFound = await shortcutService.getShortcut(
      user.id,
      req.params.id
    );

    res.status(200).json(shortcutFound);
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          message: "An error has occurred, cannot get goal",
          error: typedError.message,
        }),
        console.log("An error has occurred, cannot get goal: ", typedError));
  }
}

export async function createShortcut(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await shortcutService.createShortcut({
      ...req.body,
      userId: user.id,
    });

    res.status(200).json({ message: "Shortcut created successfully" });
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          message: "An error has occurred while creating shortcut",
          error: typedError.message,
        }),
        console.log(
          "An error has occurred while creating shortcut: ",
          typedError
        ));
  }
}

export async function deleteShortcut(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await shortcutService.deleteShortcut(user.id, req.params.id);
    res.status(200).json({ message: "Shortcut deleted successfully" });
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          message: "An error has occurred while deleting shortcut",
          error: typedError.message,
        }),
        console.log(
          "An error has occurred while deleting shortcut: ",
          typedError
        ));
  }
}

export async function updateShortcut(req: Request, res: Response) {
  try {
    const user = req.user as JwtPayload;

    await shortcutService.updateShortcut(user.id, req.params.id, req.body);
    res.status(200).json({ message: "Shortcut updated successfully" });
  } catch (error) {
    const typedError = error as Error;

    typedError instanceof HttpError
      ? res.status(typedError.statusCode).json({ message: typedError.message })
      : (res.status(500).json({
          message: "An error has occurred while updating shortcut",
          error: typedError.message,
        }),
        console.log(
          "An error has occurred while updating shortcut: ",
          typedError
        ));
  }
}
