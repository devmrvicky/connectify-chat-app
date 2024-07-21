import React from "react";
import { BiCamera } from "react-icons/bi";

const CaptureImgBtn = ({ captureImg }) => {
  // const { captureImg } = useCamera();
  return (
    <button
      className="w-20 h-20 flex items-center justify-center bg-dark-bg2/50 backdrop-blur-md border rounded-full transition-all active:scale-95 tooltip"
      onClick={captureImg}
      data-tip="capture image"
    >
      <BiCamera className="w-8 h-8 text-light-text" />
    </button>
  );
};

export default CaptureImgBtn;
