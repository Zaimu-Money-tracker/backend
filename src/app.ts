import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

const app = express();

app.use(
  cors({ origin: "http://localhost:5173", credentials: true }),
  express.json(),
  cookieParser(),
  logger("dev")
);

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", transactionRoutes);

export default app;
