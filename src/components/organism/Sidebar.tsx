"use client";

import React, { useState, useEffect } from "react";
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
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import MenuItem from "@/components/atoms/MenuItem";

const SidebarComponent = () => {
  const handleSignout = () => {};
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();
  const pathname = usePathname();

  const isDark = mounted && theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="hidden lg:block">
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
                suppressHydrationWarning
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
        <SidebarFooter>
          <Button onClick={handleSignout}>Logout</Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
