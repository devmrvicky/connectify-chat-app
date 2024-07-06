import React from "react";
import SideBarLayout from "../layout/SideBarLayout";
import { CiChat1 } from "react-icons/ci";
import { TfiAngleRight } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { HiUser } from "react-icons/hi2";

const NotificationSideBar = () => {
  const menus = [
    // { name: "All", path: "all", icon: <CiChat1 className="w-6 h-6 mr-2" /> },
    {
      name: "Chats",
      path: "chats",
      icon: <MdMarkUnreadChatAlt className="w-6 h-6 mr-2" />,
    },
    {
      name: "Friend requests",
      path: "friends",
      icon: <HiUser className="w-6 h-6 mr-2" />,
    },
    // {
    //   name: "Other",
    //   path: "other",
    //   icon: <CiChat1 className="w-6 h-6 mr-2" />,
    // },
  ];
  return (
    <SideBarLayout
      sidebarContentTitle="Notification categories"
      hideCondition={false}
    >
      <ul className="flex flex-col flex-1 h-full w-full py-2 gap-3">
        {menus.map((menu) => (
          <li key={menu.name} className="w-full">
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 py-3 rounded hover:bg-zinc-200/20 min-[420px]:bg-zinc-200/20 cursor-pointer"
                  : "flex items-center p-2 py-3 rounded hover:bg-zinc-200/20 cursor-pointer"
              }
              // onClick={() => selectFriendPage(menu.name)}
            >
              <span>{menu.icon}</span>
              <span>{menu.name}</span>

              <span className="ml-auto">
                <TfiAngleRight className="w-4 h-4" />
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </SideBarLayout>
  );
};

export default NotificationSideBar;