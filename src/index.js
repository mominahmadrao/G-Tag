import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port http:localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection error", err);
    process.exit(1);
  });
