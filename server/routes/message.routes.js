import express from "express";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import { checkUserAuthentication } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/send/:receiverId", checkUserAuthentication, sendMessage);
router.get("/:id", checkUserAuthentication, getMessages);

export default router;
