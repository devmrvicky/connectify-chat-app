import { formatDistanceToNow } from "date-fns";
import React from "react";
import Message from "./Message";

const MessagesGroup = ({ messages }) => {
  return (
    <div className="border">
      {/* {formatDistanceToNow(message.createdAt)} */}
      {messages.map((message) => {
        return <Message key={message._id} {...message} />;
      })}
    </div>
  );
};

export default MessagesGroup;
