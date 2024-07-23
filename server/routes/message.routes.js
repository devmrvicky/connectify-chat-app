import express from "express";
import {
  deleteMessage,
  getMessages,
  sendMessage,
  // uploadFile,
} from "../controller/message.controller.js";
import { checkUserAuthentication } from "../middleware/user.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post(
  "/send/:receiverId",
  checkUserAuthentication,
  upload.single("file"),
  sendMessage
);
router.delete("/delete/:messageId", checkUserAuthentication, deleteMessage);
router.get("/:id", checkUserAuthentication, getMessages);

export default router;
