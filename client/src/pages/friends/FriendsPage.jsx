import React, { useEffect } from "react";
import FriendSideBar from "../../components/aside/FriendSideBar";
import MainContentLayout from "../../components/layout/MainContentLayout";
import { peopleSvg } from "../../assets";
import { SearchBox } from "../../components";
import { Outlet, useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import { useMediaQuery } from "@uidotdev/usehooks";
import { TfiAngleLeft } from "react-icons/tfi";
import { useFriendRequestsUpdate } from "../../hooks/friend/useFriendRequestsUpdate";

const FriendsPage = () => {
  const navigate = useNavigate();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

  const { selectFriendPage } = useStore((store) => store);

  useFriendRequestsUpdate();

  const navigateBack = () => {
    navigate("/friends");
    selectFriendPage(null);
  };

  return (
    <MainContentLayout>
      <FriendSideBar />
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-3 py-2">
          <div className="friend-page-head flex gap-2 items-center">
            {isSmallDevice && (
              <button onClick={navigateBack}>
                <TfiAngleLeft />
              </button>
            )}
            <p className="text-xl font-medium">All friends</p>
          </div>
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
