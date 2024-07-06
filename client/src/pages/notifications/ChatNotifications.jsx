import ChatNotification from "./ChatNotification";

const ChatNotifications = () => {
  return (
    <div className="chat-notification flex flex-col w-full gap-2">
      <ChatNotification />
      <ChatNotification />
      <ChatNotification />
      <ChatNotification />
      <ChatNotification />
      <ChatNotification />
    </div>
  );
};

export default ChatNotifications;
