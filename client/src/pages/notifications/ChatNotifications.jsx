import { useNavigate } from "react-router-dom";
import NotificationItemLayout from "../../components/layout/NotificationItemLayout";
import useStore, { useFriendStore } from "../../zustand/store";

const ChatNotifications = () => {
  const navigate = useNavigate();

  const { unreadMessages, selectFriend, removeUnreadMessage } = useStore(
    (store) => store
  );
  const { myContacts } = useFriendStore((store) => store);

  const handleOpenNotification = (id) => {
    navigate("/");
    selectFriend();
  };

  const handleRemoveNotification = (id) => {
    removeUnreadMessage(id);
  };

  return (
    <div className="chat-notification flex flex-col w-full gap-2">
      {unreadMessages.reverse().map((unreadMessage) => {
        const sender = myContacts.find(
          (contact) => contact._id === unreadMessage.senderId
        );
        return (
          <NotificationItemLayout
            key={unreadMessage._id}
            handleRemoveNotification={() =>
              handleRemoveNotification(unreadMessage._id)
            }
            profilePic={sender?.profilePic}
          >
            <p className="">
              <i>"{sender?.fullName}"</i> has send message:{" "}
              <b>"{unreadMessage.message}"</b>
            </p>
          </NotificationItemLayout>
        );
      })}
    </div>
  );
};

export default ChatNotifications;
