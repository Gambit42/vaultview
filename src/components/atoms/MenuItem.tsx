import React from "react";
import Link from "next/link";
import DashboardIcon from "@/components/icons/DashboardIcon";
import MarketIcon from "@/components/icons/MarketIcon";
import Text from "@/components/atoms/Text";
import { useTheme } from "next-themes";

const MenuItem: React.FC<{ link: string; name: string; isActive: boolean }> = ({
  link,
  isActive,
  name,
}) => {
  const { theme } = useTheme();
  const iconMap: Record<string, React.FC<{ color?: string }>> = {
    dashboard: DashboardIcon,
    market: MarketIcon,
  };

  const inactiveIconColor = theme === "dark" ? "#B8C0CC" : "#2B2E48";

  const IconComponent = iconMap[name.toLowerCase()];
  return (
    <Link href={link} className="flex flex-row items-center h-full py-3 ">
      {isActive && (
        <div className="w-[7px] h-full absolute left-0 bg-[#7B57E0]">
          {/* <Image fill alt="active-menu" src="/active-menu-indicator.svg" /> */}
        </div>
      )}
      <div className="px-8 flex flex-row items-center justify-center space-x-2">
        <IconComponent
          color={`${isActive ? "#7B57E0" : `${inactiveIconColor}`}`}
        />
        <Text
          as="h1"
          styleVariant="T2"
          className="flex flex-row items-center font-medium"
          onClick={() => {
            console.log(IconComponent);
          }}
        >
          {name}
        </Text>
      </div>
    </Link>
  );
};

export default MenuItem;
