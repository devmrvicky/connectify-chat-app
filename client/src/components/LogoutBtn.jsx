import React from "react";
import { IoLogOut } from "react-icons/io5";
import useLogout from "../hooks/auth/useLogout";

const LogoutBtn = () => {
  const { logout } = useLogout();
  return (
    <button onClick={logout} className="ml-auto">
      <IoLogOut className="w-8 h-8 rotate-180" />
    </button>
  );
};

export default LogoutBtn;
