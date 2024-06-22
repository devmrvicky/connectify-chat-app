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
  changeUserStatus: (status) =>
    set((state) => ({ USER_STATUS: status })),

  currentEmail: null,
  changeCurrentEmail: (email) => set(() => ({currentEmail: email}))
}));

export default useStore;
