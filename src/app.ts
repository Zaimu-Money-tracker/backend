import express from "express";
import cors from "cors";
import logger from "morgan";
import usersRoute from "./routes/user.route.js";

const app = express();

app.use(
  "/users",
  usersRoute,
  cors({ origin: ["http://localhost:5173", ""] }),
  express.json(),
  logger("dev")
);

export default app;
