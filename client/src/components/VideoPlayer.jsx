import React, { useRef, useState } from "react";
import { CiPause1, CiPlay1 } from "react-icons/ci";

const VideoPlayer = ({ videoSrc, className = "" }) => {
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
    <div className={`${className}`}>
      <button
        type="button"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
        onClick={handlePlayVideo}
      >
        {!isVideoPlaying ? (
          <CiPlay1 className="w-10 h-10" />
        ) : (
          <CiPause1 className="w-10 h-10" />
        )}
      </button>
      <video src={videoSrc} className="w-full h-full " ref={videoRef} loop />
    </div>
  );
};

export default VideoPlayer;
