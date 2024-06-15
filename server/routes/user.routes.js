import express from "express";
import { login, logout, signup } from "../controller/auth.controller.js";
import {
  getAllUsers,
  getUserTypingStatus,
} from "../controller/user.controller.js";
import { checkUserAuthentication } from "../middleware/user.middleware.js";

const router = express.Router();

// auth router
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", checkUserAuthentication, logout);

// user router
router.get("/all-users", checkUserAuthentication, getAllUsers);
router.post(
  "/typing-status/:receiverId",
  checkUserAuthentication,
  getUserTypingStatus
);

export default router;
