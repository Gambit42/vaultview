import React from "react";
import currencyStore from "@/context/currencyStore";
import Combobox from "@/components/atoms/Combobox";
import { FIATS_ARRAY } from "@/constants";

const CurrencySelector = () => {
  const { currency, setCurrency } = currencyStore();
  return (
    <Combobox options={FIATS_ARRAY} value={currency} setValue={setCurrency} />
  );
};

export default CurrencySelector;
