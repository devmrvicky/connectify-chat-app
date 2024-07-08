import React from "react";
import { NavLink } from "react-router-dom";
import useStore, { useFriendStore } from "../zustand/store";

const MenuItems = ({ menus, className = "" }) => {
  const { changeCurrentActivePage, unreadMessages } = useStore(
    (store) => store
  );
  const { friendRequestNotifications } = useFriendStore((store) => store);
  const totalNotifications =
    unreadMessages.length + friendRequestNotifications.length;
  return (
    <ul className={`flex  gap-5 h-full flex-1 justify-center ${className}`}>
      {menus.map((menu) => (
        <li
          key={menu.name}
          className={`${menu.name === "setting" && "mt-auto"} indicator`}
        >
          {/* unread messages indication */}
          {menu.name === "Chat" && (
            <NotificationIndicator totalNotifications={unreadMessages.length} />
          )}
          {/* friend requests indication */}
          {menu.name === "Friends" && (
            <NotificationIndicator
              totalNotifications={friendRequestNotifications.length}
            />
          )}
          {/* all notifications indication */}
          {menu.name === "Notification" && (
            <NotificationIndicator totalNotifications={totalNotifications} />
          )}
          <NavLink
            to={menu.path}
            className={`w-10 h-10 rounded-full  text-zinc-500 hover:text-zinc-300 flex items-center justify-center tooltip`}
            data-tip={menu.name}
            onClick={() => changeCurrentActivePage(menu.name.toLowerCase())}
          >
            {({ isActive }) => (isActive ? menu.activeIcon : menu.icon)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const NotificationIndicator = ({ menu, menuName, totalNotifications = 0 }) => {
  return (
    Boolean(totalNotifications) && (
      <span className="indicator-item badge rounded-full badge-primary">
        {totalNotifications > 99 ? "99+" : totalNotifications}
      </span>
    )
  );
};

export default MenuItems;
