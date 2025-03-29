import React from "react";
import Image from "next/image";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/ui/button";
import CurrencySymbol from "@/components/atoms/CurrencySymbol";
import { handleConvertToCurrency } from "@/lib/numbers";
import currencyStore from "@/context/currencyStore";
const Stats: React.FC<{ value: number }> = ({ value }) => {
  const isNegative = value < 0;
  return (
    <div
      className={` ${
        isNegative ? "bg-red-500/20" : "bg-success/20"
      } rounded-full h-[26px] flex flex-row justify-center items-center px-2 space-x-1`}
    >
      <Image
        width={14}
        height={14}
        alt=""
        src={
          isNegative ? "/icons/downtrend-icon.svg" : "/icons/uptrend-icon.svg"
        }
      />
      <Text
        as="h1"
        styleVariant="T2"
        className={`${isNegative ? "text-error" : "text-success"}`}
      >
        {`${value.toFixed(2)}%`}
      </Text>
    </div>
  );
};

const Card: React.FC<{
  color: string;
  image: string;
  title: string;
  value: string;
  percentageChange: number;
  usdtPrice: number;
  gainOrLoss: number;
}> = ({
  color,
  image,
  title,
  value,
  percentageChange,
  usdtPrice,
  gainOrLoss,
}) => {
  const { currency } = currencyStore();

  const convertedValue = handleConvertToCurrency(
    currency,
    Number(value),
    usdtPrice
  );
  const gainorLossValue = handleConvertToCurrency(
    currency,
    Number(gainOrLoss),
    usdtPrice
  );
  return (
    <div className="bg-card-background h-[150px] w-[268px] rounded-lg p-4 flex flex-col items-start justify-between">
      <div className="flex flex-row items-start justify-start space-x-2">
        <div
          style={{ backgroundColor: color }}
          className={` w-[44px] h-[44px] flex items-center justify-center rounded-full mt-1`}
        >
          <Image width={24} height={24} alt="" src={image} />
        </div>
        <div className="flex flex-col">
          <Text as="h1" styleVariant="T1" className="font-semibold">
            {title}
          </Text>
          <div className="flex flex-row gap-1 items-center justify-start">
            <CurrencySymbol />
            <Text as="h1" styleVariant="T2">
              {convertedValue.toLocaleString()}
            </Text>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div
          className={`${
            gainorLossValue <= 0 ? "text-down" : "text-up"
          } flex flex-row gap-1`}
        >
          <CurrencySymbol />
          <Text
            as="h1"
            styleVariant="T2"
            className={`${gainorLossValue <= 0 ? "text-down" : "text-up"}`}
          >
            {Math.abs(gainorLossValue).toLocaleString()}
          </Text>
        </div>
        <Stats value={percentageChange} />
      </div>
    </div>
  );
};

export default Card;
