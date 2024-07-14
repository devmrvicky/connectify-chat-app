import React from "react";
import { BiDownload } from "react-icons/bi";

const FileDownloadBtn = () => {
  return (
    <button
      type="button"
      className="absolute bottom-2 left-2 flex items-center gap-1 bg-dark-bg2/50 text-light-text/80 backdrop-blur-md px-3 py-2 rounded-full"
    >
      <BiDownload className="w-4 h-4" />
      {/* <span className="text-xs">
                  {message?.size ? message?.size : "download"}
                </span> */}
    </button>
  );
};

export default FileDownloadBtn;
