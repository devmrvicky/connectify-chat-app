import React from "react";
import SideBarLayout from "../layout/SideBarLayout";
import { RiUserShared2Line } from "react-icons/ri";
import { TfiAngleRight } from "react-icons/tfi";
// import { RiUserAddLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { PiUserList } from "react-icons/pi";
import { RiUserReceived2Line } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import { TbUsers } from "react-icons/tb";

const FriendSideBar = () => {
  const menus = [
    {
      name: "Friends",
      path: "",
      icon: <PiUserList className="w-6 h-6 mr-2" />,
    },
    {
      name: "Friend requests",
      path: "requests",
      icon: <RiUserReceived2Line className="w-6 h-6 mr-2" />,
    },
    // {
    //   name: "Suggestions",
    //   path: "suggestions",
    //   icon: <RiUserAddLine className="w-6 h-6 mr-2" />,
    // },
    {
      name: "Send requests",
      path: "send-friend-requests",
      icon: <RiUserShared2Line className="w-6 h-6 mr-2" />,
    },
    {
      name: "Groups",
      path: "groups",
      icon: <TbUsersGroup className="w-6 h-6 mr-2" />,
    },
  ];
  return (
    <SideBarLayout sidebarContentTitle="friends" hideCondition={false}>
      <ul className="flex flex-col w-full py-2 gap-3">
        {menus.map((menu) => (
          <li key={menu.name} className="w-full">
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 py-3 rounded bg-zinc-200/20 cursor-pointer"
                  : "flex items-center p-2 py-3 rounded hover:bg-zinc-200/20 cursor-pointer"
              }
            >
              <span>{menu.icon}</span>
              <span>{menu.name}</span>
              {menu.name !== "Home" && (
                <span className="ml-auto">
                  <TfiAngleRight className="w-4 h-4" />
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </SideBarLayout>
  );
};

export default FriendSideBar;
