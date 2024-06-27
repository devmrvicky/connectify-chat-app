import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timeStamps: true }
);

const Conversation = mongoose.model("Conversation", contactSchema);

export { Conversation };
