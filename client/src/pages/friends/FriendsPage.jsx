import React, { useEffect } from "react";
import FriendSideBar from "../../components/aside/FriendSideBar";
import MainContentLayout from "../../components/layout/MainContentLayout";
import { peopleSvg } from "../../assets";
import { SearchBox } from "../../components";
import { Outlet, useNavigate } from "react-router-dom";

const FriendsPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("?tab=my-friends");
  }, []);
  return (
    <MainContentLayout>
      <FriendSideBar />
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-3 py-2">
          <p className="text-xl font-medium">All friends</p>
          <SearchBox />
        </div>
        <Outlet />
      </div>
    </MainContentLayout>
  );
};

const NoFriendRequests = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <span className="w-44">{peopleSvg}</span>
      <span>
        When you have friend requests or suggestions, you'll see them here.
      </span>
    </div>
  );
};

export default FriendsPage;
