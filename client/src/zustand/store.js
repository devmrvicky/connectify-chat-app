import { create } from "zustand";

const useStore = create((set) => ({
  selectedFriend: null,
  messages: [],
  selectFriend: (friend) => set((state) => ({ selectedFriend: friend })),
  setMessages: (messages) => set(() => ({ messages: messages })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));

export default useStore;
