import React from "react";
import { Link } from "react-router-dom";
import logoPng from "../../public/chat.png";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-4 my-3 max-[420px]:my-0">
      <div className="w-10 h-10 max-[420px]:w-9 max-[420px]:h-9">
        <img src={logoPng} alt="logo" className="w-full" />
      </div>
      <span className="text-[24px] max-[420px]:text-[18px] font-medium text-dark-text dark:text-light-text">
        CONNECTIFY
      </span>
    </Link>
  );
};

export default Logo;
