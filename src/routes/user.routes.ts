import express, { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import * as user from "../controllers/user.controller.js";
import uploadFile from "../middlewares/uploadFile.js";

const router: Router = express.Router();

router.get("/user", validateToken, user.getUser);
router.post("/upload", validateToken, uploadFile, user.uploadUserPhoto);

export default router;
