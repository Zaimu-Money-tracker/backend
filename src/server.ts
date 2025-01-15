import app from "./app.js";
import dotenv from "dotenv";
import conectDB from "./config/database.js";

dotenv.config();

const port: string | undefined = process.env.SERVER_PORT;

app
  .listen(port, () => {
    console.log(`Server running at port ${port}`);
  })
  .on("error", (error: Error) => {
    console.error(
      `Can't run the server, an error has occurred: ${error.message}`
    );
  });

void conectDB();
