import React, { useEffect, useRef } from "react";
import { Message } from "..";
import useGetMessages from "../../hooks/chat/useGetMessages";
import useStore from "../../zustand/store";
import useListMessages from "../../hooks/chat/useListMessages";
import ChatSkeleton from "../skeleton/ChatSkeleton";

const MessagesContainer = () => {
  const lastMessageRef = useRef(null);
  const messages = useStore((store) => store.messages);
  const { loading } = useGetMessages();
  // console.log(lastChat);
  useListMessages();
  const noMessages = Boolean(messages.length);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages.length]);

  return (
    <div className="message-container flex-1 max-w-[900px] w-full mx-auto overflow-auto py-4">
      {!noMessages ? (
        <EmptyChatMessage />
      ) : (
        <>
          {!loading ? (
            messages.map((message) => (
              <Message
                key={message._id}
                {...message}
                lastMessageRef={lastMessageRef}
              />
            ))
          ) : (
            <ChatSkeleton />
          )}
        </>
      )}
    </div>
  );
};

const EmptyChatMessage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center text-lg py-3">
      <p>Please start your first chatting!</p>
    </div>
  );
};

export default MessagesContainer;
