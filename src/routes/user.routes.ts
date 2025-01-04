import express, { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { user } from "../controllers/user.controller.js";

const router: Router = express.Router();

router.get("/user", validateToken, user);

export default router;
