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

// here message will be display according to message type (text, image, video, audio)

const Message = ({ lastMessageRef, message }) => {
  const { authUser } = useAuthContext();
  const selectedFriend = useStore((store) => store.selectedFriend);
  const chatType =
    authUser?._id === message.senderId ? "chat-end" : "chat-start";
  const profilePic =
    authUser?._id === message.senderId
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
        {message.type === "text" && (
          <span className="break-words">{message.message}</span>
        )}
        {message.type === "img" && (
          <div className="w-full max-w-[250px] h-auto">
            <img src={message.src} alt={message.name} className="w-full" />
            <span>{message.caption}</span>
          </div>
        )}
        <span className="text-[10px] ml-auto text-zinc-500">
          {format(message.createdAt, "hh:mm aa")}
        </span>
      </div>
      <div className="chat-footer opacity-50">
        {formatDistanceToNow(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
