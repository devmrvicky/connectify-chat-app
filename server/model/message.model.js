import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["text", "img", "video"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "success", "failed"],
    },
    messageId: {
      type: String,
      required: true,
      unique: true,
    },
    imgSrc: {
      type: String,
    },
    caption: String,
    fileName: String,
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export { Message };
