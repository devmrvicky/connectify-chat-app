import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config({
  path: "../.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// test route
app.get("/test", (req, res) => {
  res.send("<h1>hello world!</h1>");
});

// import router
import userRouter from "./routes/user.routes.js";

// user middle ware
app.use("/api/user", userRouter);

export { app };
