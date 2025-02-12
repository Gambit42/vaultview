import React, { ReactNode } from "react";
import Sidebar from "@/components/organism/Sidebar";
import Navbar from "@/components/organism/Navbar";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="w-full lg:px-4">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
