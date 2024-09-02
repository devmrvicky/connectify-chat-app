import React from "react";
import { BsKeyFill } from "react-icons/bs";

const AccountSetting = () => {
  return (
    <button className="flex items-center gap-2 p-3 w-full hover:bg-zinc-200/20 rounded-md cursor-pointer">
      <BsKeyFill className="w-6 h-6" />
      <span>Account</span>
    </button>
  );
};

export default AccountSetting;
