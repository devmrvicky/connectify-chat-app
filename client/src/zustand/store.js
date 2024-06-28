import { create } from "zustand";

const useStore = create((set) => ({
  selectedFriend: null,
  messages: [],
  searchedFriends: [],
  selectFriend: (friend) => set((state) => ({ selectedFriend: friend })),
  setMessages: (messages) => set(() => ({ messages: messages })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setSearchedFriends: (friends) => set(() => ({ searchedFriends: friends })),

  lastConversation: null,
  addLastConversation: (conversation) =>
    set((state) => ({ lastConversation: conversation })),

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
  removeFriendRequest: (friendId) =>
    set((state) => ({
      allFriendsRequest: state.allFriendsRequest.filter(
        (friend) => friend._id !== friendId
      ),
    })),
  removeFriendRequestSend: (friendId) =>
    set((state) => ({
      allFriendsRequestSend: state.allFriendsRequestSend.filter(
        (friend) => friend._id !== friendId
      ),
    })),
  removeMyFriend: (friendId) =>
    set((state) => ({
      allMyFriends: allMyFriends.filter((friend) => friend._id !== friendId),
    })),
  removeMyContact: (friendId) =>
    set((state) => ({
      myContacts: myContacts.filter((friend) => friend._id !== friendId),
    })),
}));

export default useStore;
export { useFriendStore };
