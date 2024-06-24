import { server } from "./app.js";
import { connectDB } from "./db/index.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("database connection successfully");
    server.listen(port, () => {
      console.log(
        `server running on : ${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_SERVER_URL
            : `http://localhost:${port}`
        }`
      );
    });
  })
  .catch((error) => {
    console.log(`database connection error: ${error.message}`);
  });
