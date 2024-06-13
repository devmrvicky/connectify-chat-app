// import express from "express";
// import { Server } from "socket.io";
// import { createServer } from "http";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// const app = express();

// dotenv.config({
//   path: "../.env",
// });

// // app.use(express.json());
// // app.use(cookieParser());
// // app.use(
// //   cors({
// //     origin: "http://localhost:3000",
// //     credentials: true,
// //   })
// // );

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected ", socket.id);

//   socket.on("disconnect", () => {
//     console.log("user disconnected ", socket.id);
//   });
// });

// export { app, server, io };
