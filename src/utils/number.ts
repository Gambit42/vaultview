export const formatNumber = (value: string | number) => {
  return Number(value).toFixed(2).toLocaleString();
};
