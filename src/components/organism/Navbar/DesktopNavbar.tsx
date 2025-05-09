"use client";

import React from "react";
import Searchbar from "@/components/molecules/Searchbar";
import ThemeSwitch from "@/components/molecules/ThemeSwitch";
import Avatar from "@/components/molecules/Avatar";
import CurrencySelector from "@/components/molecules/CurrencySelector";

const DesktopNavbar = () => {
  return (
    <div className="h-[80px] bg-card-background w-full rounded-lg flex-row justify-between items-center px-4 hidden lg:flex">
      <Searchbar />
      <div className="flex flex-row space-x-2">
        <CurrencySelector />
        <Avatar />
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default DesktopNavbar;
