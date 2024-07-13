import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useStore from "../../zustand/store";
import { format, formatDistanceToNow } from "date-fns";
import avatarIcon from "../../assets/avatar-icon.png";
import { FaUpload, FaXmark } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiCheckDouble } from "react-icons/bi";

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
        <span className="break-words">{message.message}</span>
        {/* {message.type === "text" && (
        )} */}
        {message.type === "img" && (
          <div className="w-full max-w-[250px] h-auto relative mb-2">
            {message?.status === "pending" && (
              <div className="uploading-indicator absolute top-0 left-0 w-full h-full bg-dark-bg2/50 z-10 flex items-center justify-center">
                <span className="loading loading-spinner w-[60px]"></span>
                <button
                  type="button"
                  className="absolute w-6 h-6 top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2"
                >
                  <FaXmark className="w-6 h-6" />
                </button>
              </div>
            )}
            {message?.status === "failed" && (
              <div className="uploading-indicator absolute top-0 left-0 w-full h-full bg-dark-bg2/50  z-10 flex items-center justify-center">
                <button
                  type="button"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 flex items-center gap-1 bg-light-bg2/50 text-light-text/80 backdrop-blur-sm px-3 py-2 rounded-full"
                >
                  <FaUpload className="w-4 h-4" />
                  <span>Retry</span>
                </button>
              </div>
            )}
            <img
              src={message.imgSrc}
              alt={message?.fileName}
              className="w-full"
            />
            <span>{message.caption}</span>
          </div>
        )}
        <span className="text-[10px] ml-auto text-zinc-500 flex items-center ">
          {format(message.createdAt, "hh:mm aa")}
          {["pending", "failed"].includes(message?.status) &&
            message?.senderId === authUser?._id && (
              <MdOutlineWatchLater className="ml-[4px] w-3 h-3" />
            )}
          {message?.status === "success" &&
            message?.senderId === authUser?._id && (
              <BiCheckDouble className="ml-[4px] w-4 h-4" />
            )}
        </span>
      </div>
      <div className="chat-footer opacity-50">
        {formatDistanceToNow(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
