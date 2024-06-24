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
  path: "./.env",
});

const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : "http://localhost:3000";

const allowedOrigins = [
  "http://localhost:3000",
  "https://connectify-rosy.vercel.app",
];

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
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
import otpRouter from "./routes/OTP.routes.js";
import friendRouter from "./routes/friend.routes.js"
import { checkUserAuthentication } from "./middleware/user.middleware.js";

// middleware -> router -> controller
// user
app.use("/api/user", userRouter);

// message
app.use("/api/messages", messageRouter);

// otp
app.use("/api/otp", otpRouter);

// friend
app.use("/api/friend", checkUserAuthentication, friendRouter)

export { app, server, io };
