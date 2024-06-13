import { create } from "zustand";

const useStore = create((set) => ({
  selectedFriend: null,
  selectFriend: (friend) => set((state) => ({ selectedFriend: friend })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}));

export default useStore;
