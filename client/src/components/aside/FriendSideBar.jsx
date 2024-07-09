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
import useStore, { useFriendStore } from "../../zustand/store";
import TotalNotificationNoIndicator from "../TotalNotificationNoIndicator";

const FriendSideBar = ({ willHideSideBar = true }) => {
  const { selectedFriendPage, selectFriendPage } = useStore((store) => store);
  const { friendRequestNotifications } = useFriendStore((store) => store);
  const myFriendNotifications = friendRequestNotifications.filter(
    (notification) => notification.type === "accepted-friend-request"
  );
  const friendRequestsNotification = friendRequestNotifications.filter(
    (notification) => notification.type === "friend-request"
  );

  const menus = [
    {
      name: "Friends",
      path: "/friends",
      icon: <PiUserList className="w-6 h-6 mr-2" />,
    },
    {
      name: "Friend requests",
      path: "/friends/requests",
      icon: <RiUserReceived2Line className="w-6 h-6 mr-2" />,
    },
    {
      name: "Send requests",
      path: "/friends/send-friend-requests",
      icon: <RiUserShared2Line className="w-6 h-6 mr-2" />,
    },
    {
      name: "Groups",
      path: "/friends/groups",
      icon: <TbUsersGroup className="w-6 h-6 mr-2" />,
    },
  ];
  return (
    <SideBarLayout
      sidebarContentTitle="friends"
      hideCondition={selectedFriendPage}
      className={
        willHideSideBar &&
        "max-[800px]:max-w-[250px] max-[720px]:hidden max-[420px]:block max-[420px]:bg-white dark:max-[420px]:bg-black max-[420px]:absolute z-10 max-[420px]:max-w-[100%] top-0 left-0 "
      }
    >
      <ul className="flex flex-col flex-1 h-full w-full py-2 gap-3">
        {menus.map((menu) => (
          <li key={menu.name} className="w-full">
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 py-3 rounded hover:bg-zinc-200/20 min-[420px]:bg-zinc-200/20 cursor-pointer text-dark-text2 dark:text-light-text"
                  : "flex items-center p-2 py-3 rounded hover:bg-zinc-200/20 cursor-pointer text-light-text2"
              }
              onClick={() => selectFriendPage(menu.name)}
            >
              <span>{menu.icon}</span>
              <span>{menu.name}</span>
              <div className="ml-auto flex items-center">
                {menu.name === "Friends" && (
                  <TotalNotificationNoIndicator
                    totalNotifications={myFriendNotifications}
                    tooltip="new friend"
                  />
                )}
                {menu.name === "Friend requests" && (
                  <TotalNotificationNoIndicator
                    totalNotifications={friendRequestsNotification}
                    tooltip="friend request"
                  />
                )}
                {menu.name !== "Home" && (
                  <span className="">
                    <TfiAngleRight className="w-4 h-4 ml-2" />
                  </span>
                )}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </SideBarLayout>
  );
};

export default FriendSideBar;
