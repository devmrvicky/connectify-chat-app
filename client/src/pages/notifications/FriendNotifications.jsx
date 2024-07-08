import React from "react";
import NotificationItemLayout from "../../components/layout/NotificationItemLayout";
import { useFriendStore } from "../../zustand/store";

const FriendNotifications = () => {
  const { friendRequestNotifications, removeFriendRequestNotification } =
    useFriendStore((store) => store);
  console.log(friendRequestNotifications);
  const handleRemoveNotification = (id) => {
    removeFriendRequestNotification(id);
  };
  return (
    <div className="flex flex-col gap-2">
      {friendRequestNotifications.map((notification) => {
        switch (notification.type) {
          case "friend-request":
            return (
              <NotificationItemLayout
                profilePic={notification.senderId.profilePic}
                handleRemoveNotification={() =>
                  handleRemoveNotification(notification._id)
                }
              >
                <span>Hello there!</span>
                <p>
                  <i>"{notification.senderId.fullName}"</i> has sent you friend
                  request
                </p>
              </NotificationItemLayout>
            );
          case "accepted-friend-request":
            return (
              <NotificationItemLayout
                profilePic={notification.profilePic}
                handleRemoveNotification={() =>
                  handleRemoveNotification(notification._id)
                }
              >
                <span>congratulation!</span>
                <p>
                  <i>{notification.fullName}</i> accepted your friend request
                </p>
              </NotificationItemLayout>
            );
          case "rejected-friend-request":
            return (
              <NotificationItemLayout
                profilePic={notification.profilePic}
                handleRemoveNotification={() =>
                  handleRemoveNotification(notification._id)
                }
              >
                <span>Oh no!</span>
                <p>
                  <i>{notification.fullName}</i> rejected your friend request
                </p>
              </NotificationItemLayout>
            );
          case "remove-sended-friend-request":
            return (
              <NotificationItemLayout
                profilePic={notification.profilePic}
                handleRemoveNotification={() =>
                  handleRemoveNotification(notification._id)
                }
              >
                <span>Oops!</span>
                <p>
                  You have missed the chance to be friend of{" "}
                  <i>{notification.fullName}</i> he has removed his friend
                  request that had sended to you
                </p>
              </NotificationItemLayout>
            );
          case "remove-my-friend":
            return (
              <NotificationItemLayout
                profilePic={notification.profilePic}
                handleRemoveNotification={() =>
                  handleRemoveNotification(notification._id)
                }
              >
                <span>Oops!</span>
                <p>
                  Your are no longer in <i>{notification.fullName}</i>'s friend
                  list.
                </p>
              </NotificationItemLayout>
            );
        }
      })}
    </div>
  );
};

export default FriendNotifications;
