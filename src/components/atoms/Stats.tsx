import React from "react";
import Image from "next/image";
import Text from "@/components/atoms/Text";

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

export default Stats;
