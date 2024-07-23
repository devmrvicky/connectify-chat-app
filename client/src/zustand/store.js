import { create } from "zustand";

const useStore = create((set) => ({
  selectedFriend: null,
  messages: [],
  searchedFriends: [],
  opeMediaGallery: false,
  setOpenMediaGallery: status => set(() => ({openMediaGallery: status})),
  selectFriend: (friend) => set((state) => ({ selectedFriend: friend })),
  setMessages: (messages) => set(() => ({ messages: messages })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  removeMessage: (messageId) => set((state) => ({messages: state.messages.filter(message => message._id !== messageId)})),
  updateLastMessage: (updatedMessage) =>
    set((state) => {
      if (state.messages.length === 0) return;

      const lastIndex = state.messages.length - 1;

      if (state.messages[lastIndex].messageId === updatedMessage.messageId) {
        state.messages[lastIndex] = {
          ...state.messages[lastIndex],
          ...updatedMessage,
        };
        console.log(state.messages);
      }
      return { messages: state.messages };
    }),
  setSearchedFriends: (friends) => set(() => ({ searchedFriends: friends })),

  // lastConversation: null,
  // addLastConversation: (conversation) =>
  //   set((state) => ({ lastConversation: conversation })),

  // user signup status
  USER_STATUS: "UNAUTHORIZE", // "VERIFIED_AUTHORIZE","REQUEST_AUTHORIZE",    "AUTHORIZE"
  changeUserStatus: (status) => set((state) => ({ USER_STATUS: status })),

  currentEmail: null,
  changeCurrentEmail: (email) => set(() => ({ currentEmail: email })),

  currentActivePage: "chat",
  changeCurrentActivePage: (activePage) =>
    set(() => ({ currentActivePage: activePage ? activePage : "home" })),
  selectedFriendPage: null,
  selectFriendPage: (friendPage) =>
    set(() => ({ selectedFriendPage: friendPage })),
  selectedNotificationSubPage: null,
  selectNotificationSubPage: (notificationSubPage) =>
    set(() => ({ selectedNotificationSubPage: notificationSubPage })),

  // unread messages
  unreadMessages: [],
  setUnreadMessages: (unreadMessages) => set(() => ({ unreadMessages })),
  addUnreadMessage: (unreadMessage) =>
    set((state) => ({
      unreadMessages: [...state.unreadMessages, unreadMessage],
    })),
  removeUnreadMessage: (id) =>
    set((state) => ({
      unreadMessages: state.unreadMessages.filter(
        (unreadMessage) => unreadMessage._id !== id
      ),
    })),
  removeAllUnreadMessages: (id) =>
    set((state) => ({
      unreadMessages: state.unreadMessages.filter(
        (unreadMessage) => unreadMessage.senderId !== id
      ),
    })),
}));

const useFriendStore = create((set) => ({
  // fields
  allFriends: [],
  allFriendsRequest: [],
  myAllFriends: [],
  myContacts: [],
  allFriendsRequestSend: [],

  // methods
  // get all
  setAllFriends: (allFriends) => set(() => ({ allFriends })),
  setAllFriendsRequest: (allFriendsRequest) =>
    set(() => ({ allFriendsRequest })),
  setMyAllFriends: (myAllFriends) => set(() => ({ myAllFriends })),
  setAllFriendsRequestSend: (allFriendsRequestSend) =>
    set(() => ({ allFriendsRequestSend })),
  setMyContacts: (myContacts) => set(() => ({ myContacts })),

  // add one
  addFriend: (friend) =>
    set((state) => ({ allFriends: [...state.allFriends, friend] })),
  addFriendRequest: (friend) =>
    set((state) => ({
      allFriendsRequest: [...state.allFriendsRequest, friend],
    })),
  addMyFriend: (friend) =>
    set((state) => ({ myAllFriends: [...state.myAllFriends, friend] })),
  addFriendRequestSend: (friend) =>
    set((state) => ({
      allFriendsRequestSend: [...state.allFriendsRequestSend, friend],
    })),
  addMyContact: (friend) =>
    set((state) => ({
      myContacts: [...state.myContacts, friend],
    })),

  // remove one
  removeFriend: (friendId) =>
    set((state) => ({
      allFriends: state.allFriends.filter((friend) => friend._id !== friendId),
    })),
  rejectFriendRequest: (friendId) =>
    set((state) => {
      // console.log(friendId);
      return {
        allFriendsRequest: state.allFriendsRequest.filter(
          (friendRequest) => friendRequest.senderId._id !== friendId
        ),
      };
    }),
  removeFriendRequestSend: (friendId) =>
    set((state) => ({
      allFriendsRequestSend: state.allFriendsRequestSend.filter(
        (friend) => friend.receiverId._id !== friendId
      ),
    })),
  removeMyFriend: (friendId) =>
    set((state) => ({
      myAllFriends: state.myAllFriends.filter(
        (friend) => friend._id !== friendId
      ),
    })),
  removeMyContact: (friendId) =>
    set((state) => ({
      myContacts: state.myContacts.filter((friend) => friend._id !== friendId),
    })),

  // friend request notification
  friendRequestNotifications: [],
  // add friend request notification
  addFriendRequestNotification: (notification) =>
    set((state) => ({
      friendRequestNotifications: [
        notification,
        ...state.friendRequestNotifications,
      ],
    })),
  // remove friend request notification
  removeFriendRequestNotification: (id) =>
    set((state) => ({
      friendRequestNotifications: state.friendRequestNotifications.filter(
        (notification) => notification._id !== id
      ),
    })),
  // remove individual type of friend request notification (type should be 'friend-request', "accepted-friend-request", "rejected-friend-request", "remove-my-friend", "remove-sended-friend-request")
  removeIndividualTypeOfNotifications: (type) =>
    set((state) => ({
      friendRequestNotifications: state.friendRequestNotifications.filter(
        (notification) => notification.type !== type
      ),
    })),
}));

export default useStore;
export { useFriendStore };
