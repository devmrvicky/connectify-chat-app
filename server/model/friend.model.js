import mongoose, { Schema } from "mongoose";

const friendSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    request: {
      type: String,
      require: true,
      enum: ["pending", "confirm"],
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);

export { Friend };
