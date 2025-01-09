import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transactions.routes.js";
import goalRoutes from "./routes/goals.routes.js";

// TODO: Fix all responses messages.
// TODO: Fix orthography.
// TODO: Fix all errors messages.
// TODO: Create shortcuts collection, controller, routes, schema and service.
// TODO: Create a service to upload images (Cloudinary (Could be)).

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
