import React, { useState } from "react";
import { FaFileImage } from "react-icons/fa6";
import { MdAudiotrack } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";

const FileShareBtns = ({ handleOnChange }) => {
  return (
    <div className="flex flex-col gap-2 w-[150px] p-2 rounded-md bg-light-bg2/100 dark:bg-dark-bg2">
      <ShareBtn
        icon={<FaFileImage className="w-5 h-5" />}
        btnName="images"
        acceptedFile="image/png, image/jpeg"
        handleOnChange={handleOnChange}
      />
      {/* <ShareBtn
        icon={<MdAudiotrack className="w-5 h-5" />}
        btnName="Audio"
        disabled={true}
      />
      <ShareBtn
        icon={<MdOutlineOndemandVideo className="w-5 h-5" />}
        btnName="Video"
        disabled={true}
      /> */}
    </div>
  );
};

const ShareBtn = ({
  icon,
  btnName,
  disabled = false,
  acceptedFile,
  handleOnChange,
}) => {
  return (
    <label
      htmlFor="image-file"
      className="flex items-center gap-2 hover:bg-light-text2/100 px-2 py-1 rounded hover:text-dark-text2"
    >
      <input
        type="file"
        name="image-file"
        id="image-file"
        className="hidden"
        accept={acceptedFile}
        disabled={disabled}
        onChange={handleOnChange}
      />
      <span className="w-10 h-10 flex items-center justify-center rounded-full">
        {icon}
      </span>
      <span>{btnName}</span>
    </label>
  );
};

export default FileShareBtns;
