import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { HiChat } from "react-icons/hi";
import { HiOutlineChat } from "react-icons/hi";
import { RiUserAddLine } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { AiFillBell } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { PiGearFill } from "react-icons/pi";
import { PiGear } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import AuthAvatarProfile from "../AuthAvatarProfile";
import SideBarDrawer from "./SideBarDrawer";
import MenuItems from "../MenuItems";

const AsideMenus = () => {
  const menus = [
    {
      name: "Chat",
      path: "/",
      icon: <HiOutlineChat className="w-8 h-8 text-light-text2" />,
      activeIcon: (
        <HiChat className="w-8 h-8 dark:text-light-text text-dark-text" />
      ),
    },
    {
      name: "Friends",
      path: "/friends",
      icon: <RiUserAddLine className="w-8 h-8 text-light-text2" />,
      activeIcon: (
        <RiUserAddFill className="w-8 h-8 dark:text-light-text text-dark-text" />
      ),
    },
    {
      name: "Notification",
      path: "/notifications",
      activeIcon: (
        <AiFillBell className="w-8 h-8 text-dark-text dark:text-light-text" />
      ),
      icon: <AiOutlineBell className="w-8 h-8 text-light-text2" />,
    },
    {
      name: "setting",
      // path: "/setting",
      path: "/",
      icon: <PiGear className="w-8 h-8 text-light-text2" />,
      activeIcon: <PiGearFill className="w-8 h-8 text-light-text2" />,
    },
  ];

  // const {unreadMessages} = useStore(store => store)

  return (
    <div className="w-[50px] h-full flex flex-col gap-5 justify-center items-center max-[420px]:hidden">
      <SideBarDrawer />
      <MenuItems menus={menus} className="flex-col" />
      {/* auth user profile */}
      <AuthAvatarProfile />
    </div>
  );
};

export default AsideMenus;
