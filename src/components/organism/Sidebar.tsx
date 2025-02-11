"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { MENUS } from "@/constants";
import Image from "next/image";
import { Moon, MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Text from "@/components/atoms/Text";
import { usePathname } from "next/navigation";
import DashboardIcon from "../icons/DashboardIcon";
import MarketIcon from "../icons/MarketIcon";
import { Button } from "@/components/ui/button";
import MenuItem from "@/components/atoms/MenuItem";

const SidebarComponent = () => {
  const handleSignout = () => {};
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  const isDark = theme === "dark";

  return (
    <div>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroupLabel className="my-6">
            <div className="w-[150px] h-[42px] relative">
              <Image
                fill
                alt="vaultview-logo"
                src={`${
                  isDark ? "/vaultview-light.svg" : "/vaultview-dark.svg"
                }`}
                style={{ objectFit: "contain" }}
              />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENUS.map((item) => {
                const isActive = item.path === pathname;
                return (
                  <SidebarMenuItem
                    key={item.name}
                    className={`${
                      isActive ? "bg-[#F3F2FC] dark:bg-[#262C36]" : ""
                    } `}
                  >
                    <SidebarMenuButton
                      asChild
                      className="h-full !hover:bg-none"
                    >
                      <MenuItem
                        link={item.path}
                        isActive={isActive}
                        name={item.name}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarContent>
        <h1
          onClick={() => {
            setTheme("light");
          }}
        >
          LIGHT
        </h1>
        <h1
          onClick={() => {
            setTheme("dark");
          }}
        >
          DARK
        </h1>
        <Text as="h1" styleVariant="T1">
          hey
        </Text>
        <SidebarFooter>
          <Button onClick={handleSignout}>Logout</Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
