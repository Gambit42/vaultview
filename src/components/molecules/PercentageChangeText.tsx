import React from "react";
import Image from "next/image";
import { formatNumber } from "@/utils/number";
import Text from "@/components/atoms/Text";

const PercentageChangeText: React.FC<{
  isUp: boolean;
  priceChange: number;
}> = ({ isUp, priceChange }) => {
  return (
    <div className="flex flex-row items-center justify-end gap-1">
      <Image
        width={10}
        height={10}
        alt="caret"
        src={isUp ? "/icons/up-green.svg" : "/icons/down-red.svg"}
      />
      <Text
        className={`uppercase ${isUp ? "text-up" : "text-down"}`}
        as="p"
        styleVariant="T2"
      >
        {`${formatNumber(priceChange)} %`}
      </Text>
    </div>
  );
};

export default PercentageChangeText;
