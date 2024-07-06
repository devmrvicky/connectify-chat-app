import React from "react";
import NotificationItemLayout from "../../components/layout/NotificationItemLayout";

const FriendNotifications = () => {
  return (
    <div className="flex flex-col gap-2">
      <NotificationItemLayout>
        <span>Oh no!</span>
        <p>
          <i>Vikash</i> rejected your friend request
        </p>
      </NotificationItemLayout>
      <NotificationItemLayout>
        <span>congratulation!</span>
        <p>
          <i>Vikash</i> accepted your friend request
        </p>
      </NotificationItemLayout>
      <NotificationItemLayout>
        <span>Oops!</span>
        <p>
          <i>Vikash</i> removed you to his friend request list.
        </p>
      </NotificationItemLayout>
      <NotificationItemLayout>
        <span>Oops!</span>
        <p>
          Your are no longer in <i>Vikash</i>'s friend list.
        </p>
      </NotificationItemLayout>
    </div>
  );
};

export default FriendNotifications;
