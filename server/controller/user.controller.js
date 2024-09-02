import { User } from "../model/user.model.js";
import { getUserFromList } from "../service/user.service.js";
import { io } from "../app.js";
import {
  deleteAssetFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

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

// update user
const updateUserProfile = async (req, res) => {
  try {
    const authUser = req.user;
    if (!authUser) {
      return res
        .status(400)
        .json({ status: false, message: "you are unauthorized." });
    }
    const fullName = req.body.fullName;
    const profileImg = req.body.profileImg;
    let cloudinaryRes;
    // if all validation will be checked then create user and set cookie
    if (req.file) {
      console.log(req.file);
      const localFilePath = req.file.path;
      if (!localFilePath) {
        return res
          .status(404)
          .json({ status: false, message: "Didn't find file on server" });
      }
      cloudinaryRes = await uploadOnCloudinary(localFilePath);
      // console.log({ cloudinaryRes });
      if (!cloudinaryRes) {
        return res.status(404).json({
          status: false,
          imgUploadStatus: false,
          message: "failed to update profile image",
        });
      }
      console.log("profile image upload successfully");
    }
    await deleteAssetFromCloudinary(authUser.profilePicPublicId);
    await User.findByIdAndUpdate(authUser._id, {
      fullName: fullName ? fullName : authUser.fullName,
      profilePic: cloudinaryRes?.secure_url
        ? cloudinaryRes?.secure_url
        : profileImg,
      profilePicPublicId: cloudinaryRes?.public_id
        ? cloudinaryRes?.public_id
        : "",
    });
    return res.status(200).json({
      status: true,
      message: "profile update successfully.",
      updatedProfileData: {
        fullName: fullName ? fullName : authUser.fullName,
        profilePic: cloudinaryRes?.secure_url
          ? cloudinaryRes?.secure_url
          : profileImg,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

export { getAllUsers, getUserTypingStatus, updateUserProfile };
