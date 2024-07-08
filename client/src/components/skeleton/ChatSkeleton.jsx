import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="flex-1 py-4">
      <div className=" chat chat-end ">
        <div className="chat-image avatar">
          <div className=" w-6 rounded-full"></div>
        </div>
        <div className=" chat-bubble bg-light-bg2 dark:bg-dark-bg2 dark:text-light-text2 text-dark-text2 w-20"></div>
      </div>
      <div className=" chat chat-start ">
        <div className="chat-image avatar">
          <div className=" w-6 rounded-full"></div>
        </div>
        <div className=" chat-bubble bg-light-bg2 dark:bg-dark-bg2 dark:text-light-text2 text-dark-text2 w-28"></div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
