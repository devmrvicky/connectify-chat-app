import React from "react";
import { MessagesContainer, ChatInput } from "..";
import useStore from "../../zustand/store";

const ChattingArea = () => {
  const selectedFriend = useStore((store) => store.selectedFriend);
  console.log(selectedFriend);
  return !selectedFriend ? (
    <NoChatSelected />
  ) : (
    <div className="flex w-full h-full flex-col">
      <div className="chat-head flex items-center gap-3">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full">
            <img src={selectedFriend.profilePic} />
            {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
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

const NoChatSelected = () => {
  return <p>Please select a chat.</p>;
};

export default ChattingArea;
