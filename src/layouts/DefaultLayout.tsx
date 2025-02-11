import React, { ReactNode } from "react";
import Sidebar from "@/components/organism/Sidebar";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default DefaultLayout;
