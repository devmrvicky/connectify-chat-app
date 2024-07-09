import React from "react";
import MainContentLayout from "../../components/layout/MainContentLayout";
import NotificationSideBar from "../../components/aside/NotificationSideBar";
import { TfiAngleLeft } from "react-icons/tfi";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import useStore from "../../zustand/store";

const NotificationsPage = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");
  const { selectNotificationSubPage, selectedNotificationSubPage } = useStore(
    (store) => store
  );

  return (
    <MainContentLayout>
      <NotificationSideBar />
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-3 py-2">
          <div className="friend-page-head flex gap-2 items-center text-dark-text2 dark:text-light-text2 py-2">
            {isSmallDevice && (
              <button onClick={() => selectNotificationSubPage(null)}>
                <TfiAngleLeft className="w-5 h-5" />
              </button>
            )}
            <p className="text-xl font-medium ">
              {selectedNotificationSubPage}
            </p>
          </div>
          {/* <SearchBox /> */}
        </div>
        <Outlet />
      </div>
    </MainContentLayout>
  );
};

export default NotificationsPage;
