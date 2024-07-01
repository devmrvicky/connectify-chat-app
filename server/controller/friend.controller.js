import { Friend } from "../model/friend.model.js";
import { User } from "../model/user.model.js";
import { getUserFromList } from "../service/user.service.js";
import { handleError } from "../utils/handleError.js";
import { io } from "../app.js";

// send friend requests
const sendFriendRequests = async (req, res) => {
  try {
    const { receiverId } = req.params;
    if (!receiverId) {
      return res.status(403).json({
        status: false,
        message: "Request receiver friend didn't find",
      });
    }
    const senderId = req.user._id;
    if (!senderId) {
      return res
        .status(400)
        .json({ status: false, message: "You are unauthorized." });
    }
    const friendRequest = await Friend.findOne({
      $or: [
        { receiverId, senderId },
        { receiverId: senderId, senderId: receiverId },
      ],
    });
    if (friendRequest) {
      if (friendRequest.request === "pending") {
        return res.status(400).json({
          status: false,
          message: "You are already in him request list.",
        });
      } else if (friendRequest.request === "confirm") {
        return res
          .status(400)
          .json({ status: false, message: "You are already in friends list." });
      }
    }
    let newFriendRequest = await Friend.create({
      receiverId,
      senderId,
      request: "pending",
    });

    if (newFriendRequest) {
      let requestedFriend = await User.findById({ _id: receiverId });
      console.log("send friend requests");
      // use socket.io
      const receiverSocketId = getUserFromList(receiverId);
      const senderUser = await User.findById({ _id: senderId });
      const request = {
        ...newFriendRequest,
        senderId: senderUser,
      };
      io.to(receiverSocketId).emit("new-friend-request", {
        request,
      });
      return res.status(200).json({
        status: true,
        message: "friend request send successfully",
        request: { ...newFriendRequest, requestedFriend },
      });
    } else {
      console.log("failed to send friend requests");
      return res
        .status(400)
        .json({ status: false, message: "invalid friend fields." });
    }
  } catch (error) {
    handleError(error, res);
  }
};

// receive friend requests
const receiveFriendRequests = async (req, res) => {
  try {
    const receiverId = req.user._id;
    if (!receiverId) {
      return res
        .status(400)
        .json({ status: false, message: "You are unauthorized." });
    }
    let friendRequests = await Friend.find({
      $or: [{ receiverId, request: "pending" }],
    }).populate("senderId");
    console.log(friendRequests);
    if (!friendRequests) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid request fields" });
    }
    res.status(200).json({
      status: true,
      message: "get all friend requests",
      friendRequests,
    });
    console.log("receive friend requests");
  } catch (error) {
    handleError(error, res);
  }
};
// receive all sended friend requests
const getAllSendedRequests = async (req, res) => {
  try {
    const senderId = req.user._id;
    if (!senderId) {
      return res
        .status(400)
        .json({ status: false, message: "You are unauthorized." });
    }
    let friendRequests = await Friend.find({
      $or: [{ senderId, request: "pending" }],
    }).populate("receiverId");
    console.log(friendRequests);
    if (!friendRequests) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid request fields" });
    }
    res.status(200).json({
      status: true,
      message: "get all sended friend requests",
      friendRequests,
    });
    console.log("receive all sended friend requests");
  } catch (error) {
    handleError(error, res);
  }
};

// accept friend requests
const acceptFriendRequest = async (req, res) => {
  try {
    const { senderId } = req.params;
    if (!senderId) {
      return res
        .status(403)
        .json({ status: false, message: "Request sender friend didn't find" });
    }
    const receiverId = req.user._id;
    if (!receiverId) {
      return res
        .status(400)
        .json({ status: false, message: "You are unauthorized." });
    }
    let friendRequest = await Friend.findOne({
      $or: [{ receiverId, senderId, request: "pending" }],
    });
    if (!friendRequest) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid request fields" });
    }
    let acceptedFriendRequest = await Friend.findOneAndUpdate(
      { $or: [{ receiverId, senderId, request: "pending" }] },
      { request: "confirm" }
    );
    // create contact list
    res.status(200).json({
      status: true,
      message: "accept friend request",
      friendRequest: acceptedFriendRequest,
    });
    console.log("accept friend request");
  } catch (error) {
    handleError(error, res);
  }
};

// get all friends
const getAllFriends = async (req, res) => {
  try {
    const authId = req.user._id;
    if (!authId) {
      return res
        .status(400)
        .json({ status: false, message: "You are unauthorized." });
    }
    let friends = await Friend.find({
      $or: [
        { receiverId: authId, request: "confirm" },
        { senderId: authId, request: "confirm" },
      ],
    }).populate(["senderId", "receiverId"]);

    console.log("from get all friends", friends);
    if (!friends) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid request fields" });
    }
    console.log("get all friends");
    return res
      .status(200)
      .json({ status: true, message: "get all friends", friends });
  } catch (error) {
    handleError(error, res);
  }
};

// remove from friend request
const removeFromFriendRequests = async (req, res) => {
  try {
    const { senderId } = req.params;
    if (!senderId) {
      return res
        .status(403)
        .json({ status: false, message: "Request sender friend didn't find" });
    }
    const receiverId = req.user._id;
    console.log({ receiverId });
    if (!receiverId) {
      return res
        .status(400)
        .json({ status: false, message: "You are unauthorized." });
    }
    await Friend.findOneAndDelete({
      $or: [
        { receiverId, senderId },
        { receiverId: senderId, senderId: receiverId },
      ],
    });
    console.log("friend removed");
    const senderSocketId = getUserFromList(senderId);
    io.to(senderSocketId).emit("remove-friend-request", { receiverId });
    return res.status(200).json({
      status: true,
      message: "friend removed successfully",
      removedFriendId: receiverId,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export {
  sendFriendRequests,
  receiveFriendRequests,
  getAllFriends,
  acceptFriendRequest,
  removeFromFriendRequests,
  getAllSendedRequests,
};
