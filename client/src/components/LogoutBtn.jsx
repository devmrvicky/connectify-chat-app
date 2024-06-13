import React from "react";
import { IoLogOut } from "react-icons/io5";
import { apiPost } from "../api/api";
import useLogout from "../hooks/useLogout";

const LogoutBtn = () => {
  const { logout } = useLogout();
  return (
    <button onClick={logout} className="ml-auto">
      <IoLogOut className="w-6 h-6 rotate-180" />
    </button>
  );
};

export default LogoutBtn;
