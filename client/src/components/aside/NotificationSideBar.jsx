import React from "react";
import SideBarLayout from "../layout/SideBarLayout";
import { CiChat1 } from "react-icons/ci";
import { TfiAngleRight } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import useStore, { useFriendStore } from "../../zustand/store";
import TotalNotificationNoIndicator from "../TotalNotificationNoIndicator";

const NotificationSideBar = ({ willHideSideBar = true }) => {
  const menus = [
    // { name: "All", path: "all", icon: <CiChat1 className="w-6 h-6 mr-2" /> },
    {
      name: "Chats",
      path: "/notifications/chats",
      icon: <MdMarkUnreadChatAlt className="w-6 h-6 mr-2" />,
    },
    {
      name: "Friend requests",
      path: "/notifications/friends",
      icon: <HiUser className="w-6 h-6 mr-2" />,
    },
    // {
    //   name: "Other",
    //   path: "other",
    //   icon: <CiChat1 className="w-6 h-6 mr-2" />,
    // },
  ];

  const {
    unreadMessages,
    selectNotificationSubPage,
    selectedNotificationSubPage,
  } = useStore((store) => store);
  const { friendRequestNotifications } = useFriendStore((store) => store);
  return (
    <SideBarLayout
      sidebarContentTitle="Notification categories"
      hideCondition={selectedNotificationSubPage}
      className={
        willHideSideBar &&
        "max-[800px]:max-w-[250px] max-[720px]:hidden max-[420px]:block max-[420px]:bg-white dark:max-[420px]:bg-black max-[420px]:absolute z-10 max-[420px]:max-w-[100%] top-0 left-0 max-[420px]:p-4 max-[420px]:pb-0"
      }
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
              onClick={() => selectNotificationSubPage(menu.name)}
            >
              <span>{menu.icon}</span>
              <span>{menu.name}</span>
              <div className="ml-auto flex items-center">
                {menu.name === "Chats" && (
                  <TotalNotificationNoIndicator
                    totalNotifications={unreadMessages}
                    tooltip="new chat"
                  />
                )}
                {menu.name === "Friend requests" && (
                  <TotalNotificationNoIndicator
                    totalNotifications={friendRequestNotifications}
                    tooltip="new friend notification"
                  />
                )}
                <span className="">
                  <TfiAngleRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </SideBarLayout>
  );
};

export default NotificationSideBar;
