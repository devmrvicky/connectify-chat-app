import React, { useEffect, useRef } from "react";
import Camera from "./Camera";
import { useCamera } from "../../hooks/camera/useCamera";
import CaptureImgBtn from "./CaptureImgBtn";
import FileSendWindow from "../FileSendWindow";
import { MdCameraswitch } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";

const OpenCameraBtn = ({ children }) => {
  const {
    openCamera,
    closeCamera,
    isCameraOpening,
    mediaStream,
    captureImg,
    capturedImgData,
    closeImgPrevWindow,
    switchCamera,
  } = useCamera();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <div className="flex items-center justify-center">
      <button
        className="tooltip before:bottom-12"
        onClick={() => {
          document.getElementById("my_modal_3").showModal();
          openCamera();
        }}
        data-tip="camera"
      >
        {children}
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box p-0 w-full h-full max-w-full max-h-full rounded-none">
          <form method="dialog" className="absolute right-5 top-2 z-10">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-md btn-circle btn-ghost text-xl"
              onClick={closeCamera}
            >
              ✕
            </button>
          </form>
          <canvas ref={canvasRef} className="hidden"></canvas>
          {!capturedImgData ? (
            <Camera
              isCameraOpening={isCameraOpening}
              mediaStream={mediaStream}
              autoPlay
              ref={videoRef}
            />
          ) : (
            <FileSendWindow
              {...capturedImgData}
              closeWindow={closeImgPrevWindow}
              maxWidth="max-w-full"
              className="h-full border-none overflow-hidden"
              fileDimension="h-full w-auto"
              closeCamera={closeCamera}
            />
          )}
          <div className="btns absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-10">
            <button
              className="btn btn-circle btn-md flex items-center justify-center tooltip"
              data-tip="switch camera"
              onClick={switchCamera}
            >
              <MdCameraswitch className="w-6 h-6" />
            </button>
            <CaptureImgBtn
              captureImg={() => captureImg({ canvasRef, videoRef })}
            />
            <button
              className="btn btn-circle btn-md flex items-center justify-center tooltip"
              data-tip="video"
              // onClick={switchCamera}
              disabled
            >
              <IoMdVideocam className="w-6 h-6" />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OpenCameraBtn;
