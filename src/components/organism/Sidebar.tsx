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

import { Button } from "@/components/ui/button";

const SidebarComponent = () => {
  const handleSignout = () => {};
  return (
    <div>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENUS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.path}>
                      {/* <item.icon /> */}
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
