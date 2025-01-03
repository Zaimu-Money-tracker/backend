import express from "express";
import validateToken from "../middlewares/validateToken.js";
import { user } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/user", validateToken, user);

export default router;
