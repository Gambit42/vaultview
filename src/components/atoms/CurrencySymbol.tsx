import React from "react";
import { FIATS_MAP } from "@/constants";
import currencyStore from "@/context/currencyStore";

const CurrencySymbol = () => {
  const { currency } = currencyStore();

  return <span>{`${FIATS_MAP[currency].sign}`}</span>;
};

export default CurrencySymbol;
