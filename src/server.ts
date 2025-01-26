import app from "./app.js";
import conectDB from "./config/db/database.js";
import { EnvConfig } from "./config/env.config.js";

const env = EnvConfig();

app
  .listen(env.port, () => {
    console.log(`Server running at port ${env.port}`);
  })
  .on("error", (error: Error) => {
    console.error(
      `Can't run the server, an error has occurred: ${error.message}`
    );
  });

void conectDB();
