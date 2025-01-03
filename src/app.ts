import express from "express";
import cors from "cors";
import logger from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({ origin: "http://localhost:5173", credentials: true }),
  express.json(),
  cookieParser(),
  logger("dev")
);

app.use("/api", authRoutes);
app.use("/api", userRoutes);

export default app;
