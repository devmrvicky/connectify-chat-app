import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { RiUserAddLine } from "react-icons/ri";
import { AiFillBell } from "react-icons/ai";
import { PiGearFill } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import AuthAvatarProfile from "../AuthAvatarProfile";

const AsideMenus = () => {
  const menus = [
    {
      name: "Chat",
      path: "/",
      icon: <HiMiniChatBubbleOvalLeftEllipsis className="w-8 h-8" />,
    },
    {
      name: "Add friends",
      path: "/friends",
      icon: <RiUserAddLine className="w-8 h-8" />,
    },
    {
      name: "Notification",
      path: "/notifications",
      icon: <AiFillBell className="w-8 h-8" />,
    },
    {
      name: "setting",
      path: "/setting",
      icon: <PiGearFill className="w-8 h-8" />,
    },
  ];

  return (
    <div className="w-[50px] h-full flex flex-col gap-5 justify-center items-center mt-4">
      <button>
        <CiMenuBurger className="w-8 h-8" />
      </button>
      <ul className="flex flex-col gap-5 h-full flex-1 justify-center">
        {menus.map((menu) => (
          <li
            key={menu.name}
            className={`${menu.name === "setting" && "mt-auto"} `}
          >
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "w-10 h-10 rounded-full bg-white/50 text-black flex items-center justify-center"
                  : "w-10 h-10 rounded-full hover:bg-white/50 hover:text-black flex items-center justify-center"
              }
            >
              {menu.icon}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* auth user profile */}
      <AuthAvatarProfile />
    </div>
  );
};

export default AsideMenus;
