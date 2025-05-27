"use client";

import React, { useEffect, useState } from "react";
import MarketTable from "@/components/organism/MarketTable";
import TransactionDialog from "@/components/organism/TransactionDialog";
import activeCryptoStore from "@/context/activeCryptoStore";
import useGetUSDTPrice from "@/hooks/useGetUSDTPrice";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import currencyStore from "@/context/currencyStore";

const MarketPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransactionsDialogOpen, setIsTransactionsDialogOpen] =
    useState(false);
  const { activeCrypto } = activeCryptoStore();
  const { data } = useGetUSDTPrice();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search"); // returns '123'
  const { currency } = currencyStore();

  useEffect(() => {
    if (!activeCrypto.tokenId) {
      return setIsTransactionsDialogOpen(false);
    }

    setIsTransactionsDialogOpen(true);
  }, [activeCrypto]);

  const {
    data: searchData,
    isLoading: isSearchDataLoading,
    refetch: searchDataRefresh,
  } = useQuery({
    queryKey: ["search-coin", searchValue],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/crypto?search=${searchValue}&currency=${currency}`
        );

        console.log("calling this pu");
        console.log("result", result);

        return result.data;
      } catch (error) {
        console.log("error", error);
      }
    },
    refetchOnWindowFocus: false, // default: true
    staleTime: 1000 * 60 * 10, // Data is considered fresh for 5 minutes
    enabled: searchValue?.trim() !== "", // only run if not empty
  });

  const {
    data: marketData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-market", currentPage],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/crypto/market?currency=${currency}&page=${currentPage}`
        );

        console.log("result", result);

        return result.data;
      } catch (error) {
        console.log("error", error);
      }
    },
    refetchOnWindowFocus: false, // default: true
    staleTime: 1000 * 60 * 10, // Data is considered fresh for 5 minutes
  });

  const tableData = searchValue ? searchData : marketData;
  const tableLoading = searchValue ? isLoading : isSearchDataLoading;
  const tableRefetch = searchValue ? refetch : searchDataRefresh;
  const isPaginated = searchValue ? false : true;

  return (
    <div className="bg-card-background">
      <MarketTable
        marketData={tableData}
        isLoading={tableLoading}
        refetch={tableRefetch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isPaginated={isPaginated}
      />
      <TransactionDialog
        isOpen={isTransactionsDialogOpen}
        setIsOpen={setIsTransactionsDialogOpen}
        usdtPrice={data}
      />
    </div>
  );
};

export default MarketPage;
