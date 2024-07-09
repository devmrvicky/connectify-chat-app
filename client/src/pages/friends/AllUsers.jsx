import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Friends from "../../components/Friends";
import MyFriends from "./MyFriends";

const AllUsers = () => {
  const [tab, setTab] = useState("my-friends");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search);
    setTab(searchQuery.get("tab"));
  }, [location.search]);

  useEffect(() => {
    navigate("/friends?tab=my-friends");
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center gap-3 ">
        <NavLink
          to="?tab=my-friends"
          className={`text-xl max-[420px]:text-base p-3 max-[420px]:p-2 my-1 ${
            tab === "my-friends"
              ? "text-dark-text2 dark:text-light-text"
              : "text-light-text2"
          }`}
        >
          My Friends
        </NavLink>
        <NavLink
          to="?tab=find-friends"
          className={`text-xl max-[420px]:text-base p-3 max-[420px]:p-2 my-1  ${
            tab === "find-friends"
              ? "text-dark-text2 dark:text-light-text"
              : "text-light-text2"
          }`}
        >
          Find Friends
        </NavLink>
      </div>
      <div className="divider divider-vertically m-0 h-0 dark:before:bg-light-text2 dark:after:bg-light-text2 w-full"></div>
      <div className="flex flex-col w-full h-full">
        {tab === "find-friends" && <Friends />}
        {tab === "my-friends" && <MyFriends />}
      </div>
    </div>
  );
};

export default AllUsers;
