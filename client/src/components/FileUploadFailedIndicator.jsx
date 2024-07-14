import React from "react";
import { FaUpload } from "react-icons/fa6";

const FileUploadFailedIndicator = () => {
  return (
    <div className="uploading-failed-indicator absolute top-0 left-0 w-full h-full bg-dark-bg2/50  z-10 flex items-center justify-center">
      <button
        type="button"
        className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 flex items-center gap-1 bg-light-bg2/50 text-light-text/80 backdrop-blur-sm px-3 py-2 rounded-full"
      >
        <FaUpload className="w-4 h-4" />
        <span>Retry</span>
      </button>
    </div>
  );
};

export default FileUploadFailedIndicator;
