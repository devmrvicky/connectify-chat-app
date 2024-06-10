import { app } from "./app.js";
import { connectDB } from "./db/index.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("database connection successfully");
    app.listen(port, () => {
      console.log(`server running on : http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`database connection error: ${error.message}`);
  });
