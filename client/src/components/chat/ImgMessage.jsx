import React from "react";
import FileMessage from "./FileMessage";

const ImgMessage = ({ message }) => {
  return (
    <FileMessage className="img-message h-auto" message={message}>
      <img src={message.fileSrc} alt={message?.fileName} className="w-full" />
    </FileMessage>
  );
};

export default ImgMessage;
