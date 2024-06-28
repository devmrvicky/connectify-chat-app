import React from "react";
import useStore from "../../zustand/store";
import avatarIcon from "../../assets/avatar-icon.png";
import { TfiAngleLeft } from "react-icons/tfi";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useSocketContext } from "../../context/SocketContext";
import useGetTypingStatus from "../../hooks/chat/useGetTypingStatus";

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
      <div className="avatar">
        <div className="w-12 h-12 rounded-full">
          <img
            src={selectedFriend.profilePic}
            onError={(e) => (e.target.src = avatarIcon)}
          />
        </div>
      </div>
      <div className="user-status">
        <p className="text-2xl">{selectedFriend.fullName}</p>
        {isOnline && !isTyping && <span className="text-sm">online</span>}
        {isTyping && <span className="text-sm text-green-500">typing...</span>}
      </div>
    </div>
  );
};

export default ChatUserHead;
