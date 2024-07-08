import React from "react";

const TotalNotificationNoIndicator = ({ totalNotifications, tooltip }) => {
  return (
    Boolean(totalNotifications.length) && (
      <span
        className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center tooltip"
        data-tip={`${totalNotifications.length} ${tooltip}`}
      >
        {totalNotifications.length}
      </span>
    )
  );
};

export default TotalNotificationNoIndicator;
