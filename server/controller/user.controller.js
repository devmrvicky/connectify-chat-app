import { User } from "../model/user.model.js";
import { getUserFromList } from "../service/user.service.js";
import { io } from "../app.js";

// get all users for sidebar
const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).json({ status: true, message: "get all users", users });
  } catch (error) {
    console.log("error from getAllUsers controller ", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

// get user typing status
const getUserTypingStatus = async (req, res) => {
  try {
    const { typingStatus } = req.body;
    // console.log(typingStatus);
    if (typingStatus == "undefined") {
      return res
        .status(404)
        .json({ status: false, message: "typing status doesn't found" });
    }
    const { receiverId } = req.params;
    const senderId = req.user._id;
    if (!senderId) {
      return res
        .status(404)
        .json({ status: false, message: "you are unauthorize user" });
    }
    const receiverSocketId = getUserFromList(receiverId);
    // const senderSocketId = getUserFromList(senderId)
    io.to(receiverSocketId).emit("typingStatus", { isTyping: typingStatus });
  } catch (error) {
    console.log("error occurs in getUserTypingStatus " + error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

export { getAllUsers, getUserTypingStatus };
