import React from "react";
import useStore from "../../zustand/store";
import { TfiAngleLeft } from "react-icons/tfi";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useSocketContext } from "../../context/SocketContext";
import useGetTypingStatus from "../../hooks/chat/useGetTypingStatus";
import Avatar from "../Avatar";

const ChatUserHead = () => {
  const { selectedFriend, selectFriend } = useStore((store) => store);

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedFriend?._id);

  const { isTyping } = useGetTypingStatus();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

  const goBackToFriendsList = () => {
    selectFriend(null);
  };
  return (
    <div className="chat-head flex items-center gap-3 h-[50px]">
      {isSmallDevice && (
        <button onClick={goBackToFriendsList}>
          <TfiAngleLeft />
        </button>
      )}
      <Avatar profilePic={selectedFriend.profilePic} dimension="w-12 h-12" />
      <div className="user-status">
        <p className="text-2xl">{selectedFriend.fullName}</p>
        {isOnline && !isTyping && <span className="text-sm">online</span>}
        {isTyping && <span className="text-sm text-green-500">typing...</span>}
      </div>
    </div>
  );
};

export default ChatUserHead;
