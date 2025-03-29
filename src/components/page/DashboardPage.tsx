"use client";

import React, { useContext } from "react";
import Card from "../molecules/Card";
import { AuthContext } from "@/context/AuthProvider";
import TransactionsTable from "@/components/organism/TransactionsTable";
import useGetPortfolioBalance from "@/hooks/useGetPortoflioBalance";
import useGetUSDTPrice from "@/hooks/useGetUSDTPrice";

const DashboardPage = () => {
  const { user, setUser } = useContext(AuthContext);

  const { data } = useGetPortfolioBalance();
  const { data: usdtPrice } = useGetUSDTPrice();

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row flex-wrap gap-4">
        <Card
          title="Portfolio Balance"
          value={data?.totalValue || 0}
          percentageChange={data?.gainOrLossPercentage || 0}
          color="#FFC565"
          image="/icons/wallet-icon.svg"
          usdtPrice={usdtPrice}
          gainOrLoss={data?.gainOrLoss}
        />
      </div>
      <TransactionsTable usdtPrice={usdtPrice} />
    </div>
  );
};

export default DashboardPage;
