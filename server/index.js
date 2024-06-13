// import { server } from "./socket/socket.js";
import { app, server } from "./app.js";
import { connectDB } from "./db/index.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("database connection successfully");
    server.listen(port, () => {
      console.log(`server running on : http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`database connection error: ${error.message}`);
  });
