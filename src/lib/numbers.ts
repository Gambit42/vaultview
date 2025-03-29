import { DEFAULT_CURRENCY } from "@/constants";

export const handleConvertToUsdt = (
  currency: string,
  valueToConvert: number,
  usdtPrice: number
) => {
  if (currency === DEFAULT_CURRENCY) return valueToConvert; // if currency is already usd just return the original value
  return valueToConvert / usdtPrice;
};

export const handleConvertToCurrency = (
  currency: string,
  valueToConvert: number,
  usdtPrice: number
) => {
  if (currency === DEFAULT_CURRENCY) return valueToConvert; // Already in USD
  if (!usdtPrice || usdtPrice <= 0) return 0; // Prevent invalid multiplication
  return valueToConvert * usdtPrice;
};
