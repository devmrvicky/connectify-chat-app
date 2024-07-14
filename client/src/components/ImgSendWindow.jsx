import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import useSendChat from "../hooks/chat/useSendChat";

const ImgSendWindow = ({ name, size, src, closeWindow, imgFile }) => {
  console.log(imgFile);
  const [caption, setCaption] = useState("");

  const { sendChat } = useSendChat();

  const handleSendImg = () => {
    if (!name || !src) return;
    const imgObj = {
      type: "img",
      fileName: name,
      imgSrc: src,
      imgFile,
      caption,
    };
    sendChat(imgObj);
    closeWindow();
  };

  return (
    <div className="w-[300px] h-auto bg-light-bg2 dark:bg-dark-bg2 text-dark-text2 dark:text-light-text2 flex flex-col gap-2 absolute z-10 p-2 shadow border rounded left-0 bottom-0">
      <div className="window-head flex items-center">
        <span>{name}</span> ({(size / 1024).toFixed(2)} kb)
        <button type="button" className="ml-auto" onClick={closeWindow}>
          <FaXmark />
        </button>
      </div>
      <div className="w-full h-auto flex-1">
        <img src={src} alt={name} className="w-full" />
      </div>
      <div className="w-full flex gap-2 items-center">
        <input
          type="text"
          name="caption"
          id="img-cap"
          className="w-full border-b p-1 px-2"
          placeholder="write caption..."
          autoFocus={true}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button
          type="button"
          className="text-green-500 tooltip"
          data-tip="send"
          onClick={handleSendImg}
        >
          <IoSend className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ImgSendWindow;
