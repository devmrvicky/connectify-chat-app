import React, { useEffect, useState } from "react";
import { useMedia } from "../../hooks/media/useMedia";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer";
import { BiMusic } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { get } from "react-hook-form";
import AudioPlayer from "../../components/AudioPlayer";

const MediaPage = () => {
  const [currentActiveFile, setCurrentActiveFile] = useState(null);
  const [isLastFile, setIsLastFile] = useState(false);
  const [isFirstFile, setIsFirstFile] = useState(false);
  const [show, setShow] = useState(false);
  const { mediaFiles, currentFile, chooseCurrentMediaFile } = useMedia();
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  const getCurrentFileIndex = (fileId) =>
    mediaFiles.map((file) => (file._id ? file._id : "")).indexOf(fileId);

  const slideLeft = (fileId) => {
    setCurrentActiveFile(mediaFiles[getCurrentFileIndex(fileId) + 1]);
  };
  const slideRight = (fileId) => {
    setCurrentActiveFile(mediaFiles[getCurrentFileIndex(fileId) - 1]);
  };

  useEffect(() => {
    setIsFirstFile(getCurrentFileIndex(currentActiveFile?._id) === 0);
    setIsLastFile(
      getCurrentFileIndex(currentActiveFile?._id) + 1 === mediaFiles.length
    );
  }, [currentActiveFile, getCurrentFileIndex, mediaFiles]);

  useEffect(() => {
    setCurrentActiveFile(currentFile);

    if (!currentFile) {
      navigate("/");
    }
  }, [currentFile]);

  return (
    <div className="w-full h-full fixed top-0 left-0 z-20 bg-black/50 backdrop-blur-md overflow-auto">
      {show && (
        <div className="media-file-head w-full px-20 max-[700px]:px-5 h-32 max-[700px]:h-24 bg-black/50 backdrop-blur-md flex items-center gap-10 absolute z-20">
          <button onClick={goBack}>
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <div className="file-name flex flex-col gap-3">
            <span className="text-xl max-[700px]:text-base">
              {currentFile.fileName}
            </span>
            <span className="max-[700px]:text-sm">{currentFile.createdAt}</span>
          </div>
        </div>
      )}
      <div
        className="media-file w-full h-full flex items-center justify-center overflow-hidden p-2"
        onClick={() => setShow((prev) => !prev)}
      >
        {currentActiveFile?.type === "image" && (
          <img
            src={currentActiveFile.fileSrc}
            alt={currentActiveFile.fileName}
            className="h-full max-[600px]:h-auto"
          />
        )}
        {currentActiveFile?.type === "video" && (
          <VideoPlayer
            videoSrc={currentActiveFile.fileSrc}
            className="w-full h-full relative"
          />
        )}
        {currentActiveFile?.type === "audio" && (
          <div className="w-full h-full bg-white flex items-center justify-center">
            <AudioPlayer
              message={{
                fileName: currentActiveFile.fileName,
                fileSrc: currentActiveFile.fileSrc,
              }}
            />
          </div>
        )}
      </div>
      {/* footer */}
      {show && (
        <div className="media-file-footer w-full px-20 max-[700px]:px-5 h-32 bg-black/50 backdrop-blur-md flex items-center gap-10 absolute bottom-5 z-20 overflow-hidden">
          <div className="carousel flex w-full h-full rounded-none p-3 gap-3">
            {mediaFiles.map((file) => (
              <FilePrev
                file={file}
                key={file._id}
                className="w-40"
                chooseCurrentMediaFile={chooseCurrentMediaFile}
                activeFile={file._id === currentActiveFile._id}
              />
            ))}
          </div>
        </div>
      )}

      {/* slide btn */}
      {show && (
        <>
          {!isFirstFile && (
            <button
              type="button"
              className=" fixed top-1/2 left-20 max-[700px]:left-5 -translate-y-1/2"
              onClick={() => slideRight(currentActiveFile._id)}
            >
              <FaAngleLeft className="w-6 h-6" />
            </button>
          )}
          {!isLastFile && (
            <button
              type="button"
              className=" fixed top-1/2 right-20 max-[700px]:right-5 -translate-y-1/2"
              onClick={() => slideLeft(currentActiveFile._id)}
            >
              <FaAngleRight className="w-6 h-6" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

const FilePrev = ({
  file,
  className = "",
  chooseCurrentMediaFile,
  activeFile,
}) => {
  return (
    <div
      className={`carousel-item h-full max-[400px]:w-[80px] ${
        activeFile && "border"
      } overflow-hidden flex items-center justify-center relative ${className}`}
      onClick={() => chooseCurrentMediaFile(file._id)}
    >
      {file.type === "image" && (
        <img src={file.fileSrc} alt={file.fileName} className="h-auto" />
      )}
      {file.type === "video" && (
        <VideoPlayer videoSrc={file.fileSrc} className="w-full h-full" />
      )}
      {file.type === "audio" && (
        <div className="w-full h-full bg-white flex items-center justify-center">
          <BiMusic className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default MediaPage;
