import userModel from "../models/user.model.js";
import express, { Request, Response } from "express";
import User from "../interfaces/user.interface.js";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
