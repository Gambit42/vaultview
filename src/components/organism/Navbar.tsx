"use client";

import React from "react";
import Searchbar from "../molecules/Searchbar";
import Text from "@/components/atoms/Text";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import CurrencySelection from "@/components/molecules/CurrencySelection";

const Navbar = () => {
  const { setTheme, theme } = useTheme();

  const isDark = theme === "dark";
  return (
    <div className="h-[80px] bg-card-background w-full rounded-lg flex flex-row justify-between items-center px-4">
      <Searchbar />
      <div className="flex flex-row">
        <CurrencySelection />
        <div>
          {isDark ? (
            <div
              className="p-2 cursor-pointer"
              onClick={() => {
                setTheme("light");
              }}
            >
              <Sun />
            </div>
          ) : (
            <div
              className="p-2 cursor-pointer"
              onClick={() => {
                setTheme("dark");
              }}
            >
              <Moon />
            </div>
          )}
        </div>
        <div className="flex flex-row space-x-2 items-center justify-center font-poppins">
          <div className="w-[35px] h-[35px] rounded-full bg-red-900" />
          <div className="flex flex-col">
            <Text as="p" styleVariant="T2" className="font-medium">
              Mark Ferdinand
            </Text>
            <Text as="p" styleVariant="T4">
              mkferdinand@gmail.com
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
