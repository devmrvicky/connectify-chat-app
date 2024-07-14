import { Conversation } from "../model/conversation.model.js";
import { Message } from "../model/message.model.js";
import { getUserFromList } from "../service/user.service.js";
import { io } from "../app.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
      console.log({ cloudinaryRes });
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

    res.status(201).json({ status: true, message: newMessage });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

// const resendFileMessage = async (req, res) => {
//   try {
//     const { receiverId } = req.params;
//     if (!receiverId) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Didn't found message receiver" });
//     }
//     const senderId = req.user._id;
//     const {localFilePath} = req.body;
//     if(!localFilePath){
//       return res.status(404).json({status: false, message: "Didn't find file on server"})
//     }
//     // find conversation between sender usr and receiver user
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });
//     if(!conversation){
//       return res.status(404).json({status: false, message: "Didn't not file conversation between sender and receiver"})
//     }
//     let cloudinaryRes = await uploadOnCloudinary(localFilePath);
//     console.log({ cloudinaryRes });
//     if (!cloudinaryRes) {
//       return res.status(404).json({
//         status: false,
//         imgUploadStatus: false,
//         // fileName: req.file.filename,
//         localFilePath,
//         message: "error in reuploading file on cloudinary",
//       });
//     }
//     console.log("upload successfully on cloud");
//   } catch (error) {

//   }
// }

// const uploadFile = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(404).json({ status: false, message: "file not found" });
//     }
//     const imgLocalPath = req?.file?.path;
//     console.log(imgLocalPath);
//     if (!imgLocalPath) {
//       return res
//         .status(404)
//         .json({ status: false, message: "error in img upload" });
//     }
//     const imgSrc = await uploadOnCloudinary(imgLocalPath);
//     console.log("uploadFile controller ", imgSrc);
//     res
//       .status(200)
//       .json({ status: true, message: "everything is good", imgSrc });
//   } catch (error) {
//     console.log("error in upload file controller ", error.message);
//     res.status(500).json({ status: false, message: error.message });
//   }
// };

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

export { sendMessage, getMessages };
