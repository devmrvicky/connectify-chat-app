import React from "react";
import { NavLink } from "react-router-dom";
import useStore from "../zustand/store";

const MenuItems = ({ menus, className = "" }) => {
  const { changeCurrentActivePage } = useStore((store) => store);
  return (
    <ul className={`flex gap-5 h-full flex-1 justify-center ${className}`}>
      {menus.map((menu) => (
        <li
          key={menu.name}
          className={`${menu.name === "setting" && "mt-auto"} `}
        >
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

export default MenuItems;
