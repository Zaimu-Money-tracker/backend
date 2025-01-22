import express, { Router } from "express";
import validateToken from "../../middlewares/validators/validateToken.js";
import { validator } from "../../middlewares/validators/validator.middleware.js";
import { createShortcutScheme } from "../../schemas/entities/shortcut.schema.js";
import * as shortcuts from "../../controllers/entities/shortcuts.controller.js";

const router: Router = express.Router();

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
