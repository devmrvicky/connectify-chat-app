import express from "express";
import {
  sendFriendRequests,
  receiveFriendRequests,
  getAllFriends,
  acceptFriendRequest,
  removeFromFriendRequests,getAllSendedRequests
} from "../controller/friend.controller.js";

const router = express.Router();

router.post("/send-request/:receiverId", sendFriendRequests);
router.get("/receive-requests", receiveFriendRequests);
router.get("/get-all-sended-requests", getAllSendedRequests);
router.put("/accept-request/:senderId", acceptFriendRequest);
router.get("/get-all-friends", getAllFriends);
router.delete("/remove-request/:senderId", removeFromFriendRequests);

export default router;
