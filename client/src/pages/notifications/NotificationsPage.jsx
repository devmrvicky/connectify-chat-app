import React from "react";
import MainContentLayout from "../../components/layout/MainContentLayout";
import NotificationSideBar from "../../components/aside/NotificationSideBar";
import { TfiAngleLeft } from "react-icons/tfi";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";

const NotificationsPage = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");
  return (
    <MainContentLayout>
      <NotificationSideBar />
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-3 py-2">
          <div className="friend-page-head flex gap-2 items-center">
            {isSmallDevice && (
              <button onClick={navigateBack}>
                <TfiAngleLeft />
              </button>
            )}
            <p className="text-xl font-medium">All notifications</p>
          </div>
          {/* <SearchBox /> */}
        </div>
        <Outlet />
      </div>
    </MainContentLayout>
  );
};

export default NotificationsPage;
