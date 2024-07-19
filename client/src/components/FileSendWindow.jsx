import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import useSendChat from "../hooks/chat/useSendChat";
import { useMediaQuery } from "@uidotdev/usehooks";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import OtherDocMessage from "./chat/OtherDocMessage";

const FileSendWindow = ({ name, size, src, fileType, closeWindow, file }) => {
  const [caption, setCaption] = useState("");
  console.log({ file });
  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

  const { sendChat } = useSendChat();

  const handleSendFile = () => {
    if (!name || !src) return;
    const fileObj = {
      // type: "img",
      type: fileType,
      fileName: name,
      fileSrc: src,
      file,
      caption,
    };
    sendChat(fileObj);
    closeWindow();
  };

  return (
    <div className="max-w-[300px] w-full h-auto bg-light-bg2/100 dark:bg-dark-bg2 text-dark-text2 dark:text-light-text2 flex flex-col gap-2 absolute z-30 p-2 shadow border rounded left-0 bottom-0">
      <div className="window-head flex items-start">
        <span>
          {name} ({(size / 1024).toFixed(2)} kb)
        </span>
        <button type="button" className="ml-auto">
          <FaXmark onClick={closeWindow} className="active:scale-95 w-6 h-6" />
        </button>
      </div>
      <div className="w-full h-auto max-h-[500px] flex-1 overflow-y-auto">
        {fileType === "image" && (
          <img src={src} alt={name} className="w-full h-auto" />
        )}
        {fileType === "video" && <VideoPlayer videoSrc={src} />}
        {fileType === "audio" && (
          <AudioPlayer message={{ fileName: name, fileSrc: src }} />
        )}
        {fileType === "application" && (
          <OtherDocMessage message={{ fileName: name, fileSrc: src }} />
        )}
      </div>
      <div className="w-full flex gap-2 items-center">
        <input
          type="text"
          name="caption"
          id="img-cap"
          className="w-full border-b p-1 px-2"
          placeholder="write caption..."
          autoFocus={!isSmallDevice}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button
          type="button"
          className="text-green-500 tooltip"
          data-tip="send"
          onClick={handleSendFile}
        >
          <IoSend className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FileSendWindow;
