import React, { ReactNode } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <DefaultLayout>
      <div className="py-10 px-4 w-full">{children}</div>
    </DefaultLayout>
  );
};

export default layout;
