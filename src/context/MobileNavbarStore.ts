import { create } from "zustand";

type MobileNavbarStoreType = {
  isMobileNavbarOpen: boolean;
  setIsMobileNavbarOpen: (value: boolean) => void;
};

const mobileNavbarStore = create<MobileNavbarStoreType>()((set) => ({
  isMobileNavbarOpen: false,
  setIsMobileNavbarOpen: (value: boolean) => set({ isMobileNavbarOpen: value }),
}));

export default mobileNavbarStore;
