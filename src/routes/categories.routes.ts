import express, { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { validator } from "../middlewares/validator.middleware.js";
import { createCategorySchema } from "../schemas/category.schema.js";
import * as categories from "../controllers/categories.controller.js";

const router: Router = express.Router();

router.get("/", validateToken, categories.getCategories);
router.get("/:id", validateToken, categories.getCategory);
router.post(
  "/",
  validateToken,
  validator(createCategorySchema),
  categories.createCategory
);
router.delete("/:id", validateToken, categories.deleteCategory);
router.put("/:id", validateToken, categories.updateCategory);

export default router;
