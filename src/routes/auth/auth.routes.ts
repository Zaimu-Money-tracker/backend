import express, { Router } from "express";
import * as auth from "../../controllers/auth/auth.controller.js";
import { validator } from "../../middlewares/validators/validator.middleware.js";
import * as authSchemas from "../../schemas/auth/auth.schema.js";

const router: Router = express.Router();

router.post("/register", validator(authSchemas.registerScheme), auth.register);
router.post("/login", validator(authSchemas.loginScheme), auth.login);
router.post("/logout", auth.logout);

export default router;
