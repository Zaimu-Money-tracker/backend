import express, { Application } from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/auth.routes.js";
import userRoutes from "./routes/user/user.routes.js";
import transactionRoutes from "./routes/entities/transactions.routes.js";
import goalRoutes from "./routes/entities/goals.routes.js";
import schemaRoutes from "./routes/entities/shortcuts.routes.js";
import categoryRoutes from "./routes/entities/categories.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app: Application = express();

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
app.use("/api/shortcuts", schemaRoutes);
app.use("/api/categories", categoryRoutes);

app.use(errorMiddleware);

export default app;
