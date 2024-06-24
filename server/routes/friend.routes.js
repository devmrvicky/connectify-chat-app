import express from "express";
import {
  sendFriendRequests,
  receiveFriendRequests,
  getAllFriends,
  acceptFriendRequest,
  removeFromFriendRequests,
} from "../controller/friend.controller.js";

const router = express.Router();

router.post("/send-request/:receiverId", sendFriendRequests);
router.get("/receive-requests", receiveFriendRequests);
router.put("/accept-request/:senderId", acceptFriendRequest);
router.get("/get-all-friends", getAllFriends);
router.delete("/remove-request/:senderId", removeFromFriendRequests);

export default router;
