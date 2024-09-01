import express from "express";
import {
  login,
  logout,
  signup,
  verifyAndLogin,
} from "../controller/auth.controller.js";
import {
  getAllUsers,
  getUserTypingStatus,
} from "../controller/user.controller.js";
import { checkUserAuthentication } from "../middleware/user.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// auth router
router.post("/signup", upload.single("profileImg"), signup);
router.post("/login", login);
router.post("/logout", checkUserAuthentication, logout);
router.post("/login-with-otp", verifyAndLogin);

// user router
router.get("/all-users", checkUserAuthentication, getAllUsers);
router.post(
  "/typing-status/:receiverId",
  checkUserAuthentication,
  getUserTypingStatus
);

export default router;
