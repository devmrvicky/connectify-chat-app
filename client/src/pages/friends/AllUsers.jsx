import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Friends from "../../components/Friends";
import MyFriends from "./MyFriends";

const AllUsers = () => {
  const [tab, setTab] = useState("my-friends");

  const location = useLocation();

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search);
    setTab(searchQuery.get("tab"));
  }, [location.search]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center gap-3 border-b border-zinc-400">
        <NavLink
          to="?tab=my-friends"
          className={`text-xl p-3 my-3 mt-5 ${
            tab === "my-friends" ? "text-zinc-200" : "text-zinc-400"
          }`}
        >
          My Friends
        </NavLink>
        <NavLink
          to="?tab=find-friends"
          className={`text-xl p-3 my-3 mt-5  ${
            tab === "find-friends" ? "text-zinc-200" : "text-zinc-400"
          }`}
        >
          Find Friends
        </NavLink>
      </div>
      <div className="flex flex-col w-full h-full">
        {tab === "find-friends" && <Friends />}
        {tab === "my-friends" && <MyFriends />}
      </div>
    </div>
  );
};

export default AllUsers;
