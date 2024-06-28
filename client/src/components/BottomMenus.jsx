import { useMediaQuery } from "@uidotdev/usehooks";
import React from "react";
import { HiChat, HiOutlineChat } from "react-icons/hi";
import { RiUserAddFill, RiUserAddLine } from "react-icons/ri";
import MenuItems from "./MenuItems";
import AuthAvatarProfile from "./AuthAvatarProfile";

const BottomMenus = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

  const menus = [
    {
      name: "Chat",
      path: "/",
      icon: <HiOutlineChat className="w-8 h-8" />,
      activeIcon: <HiChat className="w-8 h-8 text-zinc-300" />,
    },
    {
      name: "Friends",
      path: "/friends",
      icon: <RiUserAddLine className="w-8 h-8" />,
      activeIcon: <RiUserAddFill className="w-8 h-8 text-zinc-300" />,
    },
  ];

  return (
    isSmallDevice && (
      <div className="w-full border-t flex items-center justify-center py-1">
        <MenuItems
          menus={menus}
          className="gap-0 flex-1 items-center justify-between"
        />
        <div className="bottom-profile flex-1 flex justify-end">
          <AuthAvatarProfile />
        </div>
      </div>
    )
  );
};

export default BottomMenus;
