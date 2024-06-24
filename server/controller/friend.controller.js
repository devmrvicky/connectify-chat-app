import { Friend } from "../model/friend.model.js";
import { handleError } from "../utils/handleError.js";

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
      $or: [{ receiverId, senderId }],
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
      console.log("send friend requests");
      return res.status(200).json({
        status: true,
        message: "friend request send successfully",
        request: newFriendRequest,
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
    });
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
    const receiverId = req.user._id;
    if (!receiverId) {
      return res
        .status(400)
        .json({ status: false, message: "You are unauthorized." });
    }
    let friends = await Friend.find({
      $or: [{ receiverId, request: "confirm" }],
    });
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
    if (!receiverId) {
      return res
        .status(400)
        .json({ status: false, message: "You are unauthorized." });
    }
    await Friend.findOneAndDelete({ $or: [{ receiverId, senderId }] });
    console.log("friend removed");
    return res
      .status(200)
      .json({ status: true, message: "friend removed successfully" });
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
};
