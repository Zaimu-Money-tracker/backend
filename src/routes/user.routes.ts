import express, { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { upload, user } from "../controllers/user.controller.js";
import uploadFile from "../middlewares/uploadFile.js";

const router: Router = express.Router();

router.get("/user", validateToken, user);
router.post("/upload", validateToken, uploadFile, upload);

export default router;
