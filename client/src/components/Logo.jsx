import React from "react";
import { Link } from "react-router-dom";
import logoPng from "../../public/chat.png";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-4 my-3">
      <div className="w-10 h-10">
        <img src={logoPng} alt="logo" className="w-full" />
      </div>
      <span className="text-[24px] font-medium">CONNECTIFY</span>
    </Link>
  );
};

export default Logo;
