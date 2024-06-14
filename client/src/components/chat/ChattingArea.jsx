import React from "react";
import { MessagesContainer, ChatInput } from "..";
import useStore from "../../zustand/store";
import avatarIcon from "../../assets/avatar-icon.png";
import { IoChatbubble, IoChatbubbles } from "react-icons/io5";

const ChattingArea = () => {
  const selectedFriend = useStore((store) => store.selectedFriend);

  return !selectedFriend ? (
    <NoFriendSelected />
  ) : (
    <div className="flex w-full h-full flex-col">
      <div className="chat-head flex items-center gap-3">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full">
            <img
              src={selectedFriend.profilePic}
              onError={(e) => (e.target.src = avatarIcon)}
            />
          </div>
        </div>
        <p className="text-2xl">{selectedFriend.fullName}</p>
      </div>
      <div className="divider divider-vertical m-0 mt-3 h-0"></div>
      <MessagesContainer />
      <div className="divider divider-vertical m-0 mb-3 h-0"></div>
      <ChatInput />
    </div>
  );
};

const NoFriendSelected = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      <p className="py-3 text-xl ">Please select a friend to talk!</p>
      <IoChatbubbles className="w-20 h-20" />
    </div>
  );
};

export default ChattingArea;
