import React from "react";
import MarketPage from "@/components/page/MarketPage";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <MarketPage />
    </Suspense>
  );
};

export default page;
