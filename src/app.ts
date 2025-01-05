import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transactions.routes.js";
import goalRoutes from "./routes/goals.routes.js";

const app = express();

app.use(
  cors({ origin: "http://localhost:5173", credentials: true }),
  express.json(),
  cookieParser(),
  logger("dev")
);

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);

export default app;
