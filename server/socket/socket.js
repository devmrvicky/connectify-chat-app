// import { io } from "../app.js";
// import {
//   deleteUserFromList,
//   getAllUsers,
//   setUserToList,
// } from "./service/user.service.js";

// io.on("connection", (socket) => {
//   console.log("a user connected ", socket.id);

//   const userId = socket.handshake.query.userId;
//   // console.log(userId);
//   if (userId != "undefined") {
//     setUserToList(userId, socket.id);
//   }
//   const users = getAllUsers();
//   io.emit("getOnlineUsers", users);

//   socket.on("disconnect", () => {
//     console.log("user disconnected ", socket.id);
//     deleteUserFromList(userId);
//     io.emit("getOnlineUsers", getAllUsers());
//   });
// });
