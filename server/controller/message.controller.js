import { Conversation } from "../model/conversation.model.js";
import { Message } from "../model/message.model.js";
import { getUserFromList } from "../service/user.service.js";
import { io } from "../app.js";
import {
  uploadOnCloudinary,
  deleteAssetFromCloudinary,
} from "../utils/cloudinary.js";

const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    if (!receiverId) {
      return res
        .status(400)
        .json({ status: false, message: "Didn't found message receiver" });
    }
    const senderId = req.user._id;
    const message = req.body;
    if (!message) {
      return res
        .status(400)
        .json({ status: false, message: "message is required" });
    }

    // find conversation between sender usr and receiver user
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // here before creating message obj check message type
    // if message type is image, video or other media file then first upload it on cloud
    let cloudinaryRes = {};
    if (req.file) {
      console.log({ file: req.file }); //
      // file: {
      //   fieldname: 'imgFile',
      //   originalname: 'warm-brown-and-cold-colour-palettes.jpg',
      //   encoding: '7bit',
      //   mimetype: 'image/jpeg',
      //   destination: './public/temp',
      //   filename: '1720854544270-warm-brown-and-cold-colour-palettes.jpg',
      //   path: 'public\\temp\\1720854544270-warm-brown-and-cold-colour-palettes.jpg',
      //   size: 205705
      // }
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
          fileName: req.file.filename,
          filePath: req.file.path,
          message: "error in uploading file on cloudinary",
        });
      }
      console.log("upload successfully on cloud");
    }
    // console.log({ message });
    // return;
    const newMessage = new Message({
      ...message,
      senderId,
      receiverId,
      fileSrc: cloudinaryRes?.secure_url,
      fileName: cloudinaryRes?.original_filename,
      publicId: cloudinaryRes?.public_id,
      dimension: [cloudinaryRes?.width, cloudinaryRes?.height],
      size: cloudinaryRes?.bytes,
      duration: cloudinaryRes?.duration,
      status: "success",
    });

    if (!newMessage) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid message fields" });
    }

    conversation.messages.push(newMessage._id);

    await Promise.all([newMessage.save(), conversation.save()]);

    const receiverSocketId = getUserFromList(receiverId);

    io.to(receiverSocketId).emit("newMessage", {
      message: newMessage,
    });

    console.log("new message", newMessage);

    res.status(201).json({ status: true, message: newMessage });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userIdToChat } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userIdToChat] },
    }).populate("messages");
    res.status(200).json({
      status: true,
      message: "get conversation",
      messages: conversation?.messages || [],
      lastMessage: conversation?.messages.at(-1),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { remoteUserId, publicId } = req.body;
    const { messageId } = req.params;
    if (!messageId) {
      return res
        .status(404)
        .json({ status: false, message: "message not found" });
    }
    if (!remoteUserId) {
      return res.status(404).json({ status: false, message: "req denied" });
    }
    const authUserId = req.user._id;
    if (!authUserId) {
      return res
        .status(404)
        .json({ status: false, message: "user unauthorized" });
    }
    if (publicId) {
      // delete from cloudinary
      const cloudinaryRes = await deleteAssetFromCloudinary(publicId);
      console.log(cloudinaryRes);
      if (!cloudinaryRes) {
        return res
          .status(400)
          .status({ status: false, message: "could not delete file" });
      }
    }
    const deleteRes = await Message.findByIdAndDelete({ _id: messageId });
    console.log(deleteRes);
    if (!deleteRes) {
      return res
        .status(400)
        .json({ status: false, message: "couldn't delete message" });
    }

    const remoteUserSocketId = getUserFromList(remoteUserId);
    io.to(remoteUserSocketId).emit("deleteMessage", {
      messageId,
      remoteUserId: authUserId,
    });

    return res
      .status(200)
      .json({ status: true, message: "successfully deleted" });
  } catch (error) {
    console.log("error in delete message ", error.message);
    return res.status(500).json({ status: true, message: error.message });
  }
};

export { sendMessage, getMessages, deleteMessage };
