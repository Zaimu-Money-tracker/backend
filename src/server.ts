import app from "./app.js";
import conectDB from "./config/db/database.js";
import { EnvConfig } from "./config/env.config.js";

const env = EnvConfig();

app
  .listen(env.port, () => {
    console.log(`🔸 Server running successfully`);
  })
  .on("error", (error: Error) => {
    console.error(`🔻 Oops, something went wrong: ${error}`);
  });

void conectDB();
