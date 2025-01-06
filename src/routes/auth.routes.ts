import express, { Router } from "express";
import * as auth from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validator.middleware.js";
import * as authSchemas from "../schemas/auth.schema.js";

const router: Router = express.Router();

router.post("/register", validator(authSchemas.register), auth.register);
router.post("/login", validator(authSchemas.login), auth.login);
router.post("/logout", auth.logout);

export default router;
