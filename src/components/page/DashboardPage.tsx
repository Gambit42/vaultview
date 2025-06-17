"use client";

import React, { useState } from "react";
import TransactionsTable from "@/components/organism/TransactionsTable";
import useGetPortfolioBalance from "@/hooks/useGetPortoflioBalance";
import useGetUSDTPrice from "@/hooks/useGetUSDTPrice";
import LoseOrGainChart from "@/components/organism/LoseOrGainChart";
import useGetPortfolioHistory from "@/hooks/useGetPortfolioHistory";
import TransactionsByTokenTable from "../organism/TransactionsByTokenTable";
import { OVERVIEW_OPTIONS } from "@/constants";

const DashboardPage = () => {
  const { data } = useGetPortfolioBalance();
  const [overviewValue, setOverviewValue] = useState(OVERVIEW_OPTIONS[0].value);

  const { data: dataHistory } = useGetPortfolioHistory(overviewValue);
  const { data: usdtPrice } = useGetUSDTPrice();

  const [currentTokenId, setCurrentTokenId] = useState("");

  return (
    <div className="flex flex-col space-y-4">
      {dataHistory && (
        <LoseOrGainChart
          dataHistory={dataHistory}
          total={data?.totalValue || 0}
          usdtPrice={usdtPrice}
          percentageChange={data?.gainOrLossPercentage || 0}
          gainOrLoss={data?.gainOrLoss}
          overviewValue={overviewValue}
          setOverviewValue={setOverviewValue}
        />
      )}
      {!currentTokenId ? (
        <TransactionsTable
          usdtPrice={usdtPrice}
          setCurrentTokenId={setCurrentTokenId}
        />
      ) : (
        <TransactionsByTokenTable
          usdtPrice={usdtPrice}
          currentTokenId={currentTokenId}
          setCurrentTokenId={setCurrentTokenId}
        />
      )}
    </div>
  );
};

export default DashboardPage;
