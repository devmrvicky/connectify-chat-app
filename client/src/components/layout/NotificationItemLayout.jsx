import React from "react";
import Avatar from "../Avatar";
import { TfiClose } from "react-icons/tfi";

const NotificationItemLayout = ({
  children,
  handleRemoveNotification,
  profilePic,
}) => {
  return (
    <div className="w-full rounded px-3 py-2 flex gap-3 items-center border dark:border-zinc-700 dark:hover:border-zinc-300/30 dark:hover:bg-zinc-500/20 hover:cursor-default">
      <Avatar dimension="w-12 h-12" profilePic={profilePic} />
      <div className="flex-1 w-full flex flex-col">{children}</div>
      <button
        className="btn tooltip"
        onClick={handleRemoveNotification}
        data-tip="dismiss"
      >
        <TfiClose className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotificationItemLayout;
