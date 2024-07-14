import React, { useRef, useState } from "react";
import FileMessage from "./FileMessage";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import VideoPlayer from "../VideoPlayer";

const VideoMessage = ({ message }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const handlePlayVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };
  return (
    <FileMessage
      className="video-message h-[350px] aspect-video"
      message={message}
    >
      <VideoPlayer videoSrc={message.fileSrc} />
    </FileMessage>
  );
};

export default VideoMessage;
