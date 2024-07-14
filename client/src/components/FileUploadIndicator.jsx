import React from "react";
import { FaXmark } from "react-icons/fa6";

const FileUploadIndicator = () => {
  return (
    <div className="uploading-indicator absolute top-0 left-0 w-full h-full bg-dark-bg2/50 z-10 flex items-center justify-center">
      <span className="loading loading-spinner w-[60px]"></span>
      <button
        type="button"
        className="absolute w-6 h-6 top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2"
      >
        <FaXmark className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FileUploadIndicator;
