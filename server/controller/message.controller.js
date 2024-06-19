import { Conversation } from "../model/conversation.model.js";
import { Message } from "../model/message.model.js";
import { getUserFromList } from "../service/user.service.js";
import { io } from "../app.js";

const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    if (!receiverId) {
      return res
        .status(400)
        .json({ status: false, message: "Didn't found message receiver" });
    }
    const senderId = req.user._id;
    const { message } = req.body;
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

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (!newMessage) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid message fields" });
    }

    conversation.messages.push(newMessage._id);

    await Promise.all([newMessage.save(), conversation.save()]);

    const receiverSocketId = getUserFromList(receiverId);

    io.to(receiverSocketId).emit("newMessage", { message: newMessage });

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

export { sendMessage, getMessages };
