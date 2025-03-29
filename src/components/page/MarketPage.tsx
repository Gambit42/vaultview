"use client";

import React, { useEffect, useState } from "react";
import MarketTable from "@/components/organism/MarketTable";
import TransactionDialog from "@/components/organism/TransactionDialog";
import activeCryptoStore from "@/context/activeCryptoStore";
import useGetUSDTPrice from "@/hooks/useGetUSDTPrice";

const MarketPage = () => {
  const [isTransactionsDialogOpen, setIsTransactionsDialogOpen] =
    useState(false);
  const { activeCrypto } = activeCryptoStore();
  const { data } = useGetUSDTPrice();

  useEffect(() => {
    if (!activeCrypto.tokenId) {
      return setIsTransactionsDialogOpen(false);
    }

    setIsTransactionsDialogOpen(true);
  }, [activeCrypto]);

  return (
    <div className="bg-card-background">
      <MarketTable />
      <TransactionDialog
        isOpen={isTransactionsDialogOpen}
        setIsOpen={setIsTransactionsDialogOpen}
        usdtPrice={data}
      />
    </div>
  );
};

export default MarketPage;
