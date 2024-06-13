import React from "react";
import { Message } from "..";
import useGetMessages from "../../hooks/chat/useGetMessages";

const MessagesContainer = () => {
  const { messages } = useGetMessages();
  const noMessages = Boolean(messages.length);
  console.log(messages);
  return (
    <div className="message-container flex-1 max-w-[900px] w-full mx-auto overflow-auto">
      {!noMessages ? (
        <ChattingStartMessage />
      ) : (
        <>
          {messages.map((message) => (
            <Message key={message._id} {...message} />
          ))}
        </>
      )}
    </div>
  );
};

const ChattingStartMessage = () => {
  return (
    <div className="w-full text-center text-sm py-3">
      <p>Please start your first chatting!</p>
    </div>
  );
};

export default MessagesContainer;
