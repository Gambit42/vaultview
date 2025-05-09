"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { MENUS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import mobileNavbarStore from "@/context/MobileNavbarStore";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/molecules/Avatar";
import CurrencySelector from "@/components/molecules/CurrencySelector";
import ThemeSwitch from "@/components/molecules/ThemeSwitch";
import Searchbar from "@/components/molecules/Searchbar";
import Text from "@/components/atoms/Text";

const MobileNavbar = () => {
  const pathname = usePathname();
  const { isMobileNavbarOpen, setIsMobileNavbarOpen } = mobileNavbarStore();

  const handleCloseDrawer = () => {
    setIsMobileNavbarOpen(false);
  };

  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();

  const isDark = mounted && theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`fixed z-[999] top-0 w-full flex flex-row items-center justify-between px-4 h-[70px] lg:hidden  transition-all ease-in delay-200  bg-card-background`}
    >
      <div className="w-[120px] h-[42px] relative">
        <Image
          fill
          alt="vaultview-logo"
          src={`${isDark ? "/vaultview-light.svg" : "/vaultview-dark.svg"}`}
          style={{ objectFit: "contain" }}
          suppressHydrationWarning
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <CurrencySelector />
        <Drawer
          direction="left"
          open={isMobileNavbarOpen}
          onOpenChange={setIsMobileNavbarOpen}
        >
          <DrawerTrigger asChild>
            <Image
              width={26}
              height={32}
              src="/icons/burger-icon.svg"
              alt="burger"
            />
          </DrawerTrigger>
          <DrawerContent className="top-16 outline-none w-full flex !mt-0 !rounded-[0px] h-fit !z-[9999]">
            <DrawerTitle />
            <div className="mx-auto w-screen ">
              <div className="bg-background flex flex-row items-center justify-between p-2">
                <Avatar />
                <ThemeSwitch />
              </div>
              <div className="p-2">
                <Searchbar />
              </div>
              <div className="flex flex-col space-y-10 py-4 items-start px-4 ">
                {MENUS.map((menu) => {
                  const isActive = menu.path === pathname;
                  return (
                    <Link
                      key={menu.path}
                      href={menu.path}
                      onClick={handleCloseDrawer}
                      className={`font-poppins text-center text-black`}
                    >
                      <Text
                        as="h1"
                        styleVariant="T2"
                        className={`flex flex-row items-center font-medium ${isActive}`}
                      >
                        {menu.name}
                      </Text>
                    </Link>
                  );
                })}
              </div>

              <DrawerFooter className="flex items-center justify-center w-full">
                <Button onClick={() => {}} className="w-full">
                  Logout
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default MobileNavbar;
