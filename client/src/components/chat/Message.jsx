import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useStore from "../../zustand/store";
import { formatDistanceToNow } from "date-fns";
import avatarIcon from "../../assets/avatar-icon.png";

const Message = ({
  senderId,
  receiverId,
  message,
  createdAt,
  lastMessageRef,
}) => {
  const { authUser } = useAuthContext();
  const selectedFriend = useStore((store) => store.selectedFriend);
  const chatType = authUser?._id === senderId ? "chat-end" : "chat-start";
  const profilePic =
    authUser?._id === senderId
      ? authUser.profilePic
      : selectedFriend.profilePic;
  return (
    <div className={`chat ${chatType}`} ref={lastMessageRef}>
      <div className="chat-image avatar">
        <div className="w-6 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={profilePic}
            onError={(e) => (e.target.src = avatarIcon)}
          />
        </div>
      </div>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer opacity-50">
        {formatDistanceToNow(createdAt)}
      </div>
    </div>
  );
};

export default Message;
