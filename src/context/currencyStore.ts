import { create } from "zustand";
import { FIATS_MAP } from "@/constants";

type CurrencyStoreType = {
  currency: keyof typeof FIATS_MAP;
  setCurrency: (value: keyof typeof FIATS_MAP) => void;
};

const currencyStore = create<CurrencyStoreType>()((set) => ({
  currency: "usd",
  setCurrency: (value: keyof typeof FIATS_MAP) => set({ currency: value }),
}));

export default currencyStore;
