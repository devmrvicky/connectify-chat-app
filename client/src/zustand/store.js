import { create } from "zustand";

const useStore = create((set) => ({
  selectedFriend: null,
  messages: [],
  searchedFriends: [],
  selectFriend: (friend) => set((state) => ({ selectedFriend: friend })),
  setMessages: (messages) => set(() => ({ messages: messages })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setSearchedFriends: (friends) => set(() => ({searchedFriends: friends}))
}));

export default useStore;
