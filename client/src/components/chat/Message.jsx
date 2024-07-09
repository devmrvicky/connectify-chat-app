import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useStore from "../../zustand/store";
import {
  format,
  formatDistanceToNow,
  formatRelative,
  getHours,
  getMinutes,
} from "date-fns";
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
      <div className="chat-bubble bg-light-bg2 dark:bg-dark-bg2 dark:text-light-text2 text-dark-text2 flex flex-col">
        <span className="break-words">{message}</span>
        <span className="text-[10px] ml-auto text-zinc-500">
          {format(createdAt, "hh:mm aa")}
        </span>
      </div>
      <div className="chat-footer opacity-50">
        {formatDistanceToNow(createdAt)}
      </div>
    </div>
  );
};

export default Message;
