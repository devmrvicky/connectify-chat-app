import express from "express";
import {
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
// router.post(
//   "/file/upload",
//   checkUserAuthentication,
//   upload.single("imgFile"),
//   uploadFile
// );
router.get("/:id", checkUserAuthentication, getMessages);

export default router;
