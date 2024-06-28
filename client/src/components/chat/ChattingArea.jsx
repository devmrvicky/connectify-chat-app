import React from "react";
import { MessagesContainer, ChatInput } from "..";
import useStore from "../../zustand/store";
import { IoChatbubbles } from "react-icons/io5";
import ChatUserHead from "./ChatUserHead";

const ChattingArea = () => {
  const { selectedFriend } = useStore((store) => store);

  return !selectedFriend ? (
    <NoFriendSelected />
  ) : (
    <div className="flex w-full h-full flex-col ">
      <ChatUserHead />
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
