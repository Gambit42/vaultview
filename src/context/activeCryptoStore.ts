import { create } from "zustand";

type Coin = {
  tokenId: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
};
type CurrencyStoreType = {
  activeCrypto: Coin;
  setActiveCrypto: (value: Coin) => void;
};

const DEFAULT_VALUE = {
  tokenId: "",
  name: "",
  symbol: "",
  image: "",
  currentPrice: 0,
};

const activeCryptoStore = create<CurrencyStoreType>()((set) => ({
  activeCrypto: DEFAULT_VALUE,
  setActiveCrypto: (value: Coin) => set({ activeCrypto: value }),
}));

export default activeCryptoStore;
