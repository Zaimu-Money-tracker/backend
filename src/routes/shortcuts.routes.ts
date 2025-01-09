import express from "express";
import validateToken from "../middlewares/validateToken.js";
import { validator } from "../middlewares/validator.middleware.js";
import { createShortcutScheme } from "../schemas/shortcut.schema.js";
import * as shortcuts from "../controllers/shortcuts.controller.js";

const router = express.Router();

router.get("/", validateToken, shortcuts.getShortcuts);
router.get("/:id", validateToken, shortcuts.getShortcut);
router.post(
  "/",
  validateToken,
  validator(createShortcutScheme),
  shortcuts.createShortcut
);
router.delete("/:id", validateToken, shortcuts.deleteShortcut);
router.put("/:id", validateToken, shortcuts.updateShortcut);

export default router;
