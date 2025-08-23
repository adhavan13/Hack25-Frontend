import { create } from "zustand";

const useHeaderStore = create((set) => ({
  activeMenu: null,
  setActiveMenu: (menu) => set({ activeMenu: menu }),
}));

export default useHeaderStore;
