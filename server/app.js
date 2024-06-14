import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import {
  deleteUserFromList,
  getAllUsers,
  setUserToList,
} from "./service/user.service.js";

const app = express();

dotenv.config({
  path: "../.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);

  const userId = socket.handshake.query.userId;
  // console.log(userId);
  if (userId != "undefined") {
    setUserToList(userId, socket.id);
  }
  const users = getAllUsers();
  io.emit("getOnlineUsers", users);

  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id);
    deleteUserFromList(userId);
    io.emit("getOnlineUsers", getAllUsers());
  });
});

// test route
app.get("/test", (req, res) => {
  res.send("<h1>hello world!</h1>");
});

// import router
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";

// middleware -> router -> controller
// user
app.use("/api/user", userRouter);

// message
app.use("/api/messages", messageRouter);

export { app, server, io };
