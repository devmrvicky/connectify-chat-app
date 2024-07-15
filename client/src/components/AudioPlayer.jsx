import React, { useRef, useState } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import FileUploadIndicator from "./FileUploadIndicator";
import FileUploadFailedIndicator from "./FileUploadFailedIndicator";
import FileDownloadBtn from "./FileDownloadBtn";
import { useAuthContext } from "../context/AuthContext";

const AudioPlayer = ({ message }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { authUser } = useAuthContext();

  const audioRef = useRef(null);
  const handleAudioPlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsAudioPlaying(true);
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          className="btn w-14 h-14 p-0 rounded-full flex items-center justify-center relative"
          onClick={handleAudioPlay}
        >
          {message?.status === "pending" ? (
            <FileUploadIndicator />
          ) : message?.status === "failed" ? (
            <FileUploadFailedIndicator />
          ) : isAudioPlaying ? (
            <MdMusicNote className="w-8 h-8" />
          ) : (
            <MdMusicOff className="w-8 h-8" />
          )}
          {/* {} */}
        </button>
        <div className="overflow-hidden flex items-center gap-2">
          <span className="text-sm">
            {message.fileName}.{message.fileSrc.split(".").at(-1)}
          </span>
          {message?.status === "success" &&
            authUser?._id !== message.senderId && (
              <FileDownloadBtn
                fileUrl={message?.fileSrc}
                fileMessageId={message._id}
                className="relative"
              />
            )}
        </div>
      </div>
      <audio
        src={message.fileSrc}
        loop
        className="w-full hidden"
        ref={audioRef}
      />
    </div>
  );
};

export default AudioPlayer;
