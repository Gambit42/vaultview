import React, { useEffect, useState } from "react";
import Text from "@/components/atoms/Text";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import Image from "next/image";
import PercentageChangeText from "@/components/molecules/PercentageChangeText";
import CurrencySymbol from "@/components/atoms/CurrencySymbol";
import currencyStore from "@/context/currencyStore";
import activeCryptoStore from "@/context/activeCryptoStore";
import { Skeleton } from "@/components/ui/skeleton";

const MarketTable: React.FC<{
  marketData: any;
  isLoading: boolean;
  refetch: any;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isPaginated: boolean;
}> = ({
  marketData,
  isLoading,
  refetch,
  currentPage,
  setCurrentPage,
  isPaginated,
}) => {
  const [coins, setCoins] = useState<any>([]);
  const { currency } = currencyStore();
  const { setActiveCrypto } = activeCryptoStore();
  const DEFAULT_ACTIVE_PAGE_NUMBERS = [1, 2, 3];
  const [activePageNumbers, setActivePageNumbers] = useState(
    DEFAULT_ACTIVE_PAGE_NUMBERS
  );

  useEffect(() => {
    if (isLoading) return;
    refetch();

     
  }, [currentPage, currency]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "#",
      meta: { size: "30px" },
      cell: ({ row }) => (
        <Text className="capitalize" as="p" styleVariant="T3">
          {row.original.market_cap_rank}
        </Text>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex flex-row items-center gap-2 min-w-[150px] ">
          <Image
            width={24}
            height={24}
            className="rounded-full"
            src={row.original.image}
            alt="coin-image"
          />
          <Text
            className="uppercase font-medium truncate overflow-hidden whitespace-nowrap w-[100px]"
            as="p"
            styleVariant="T3"
          >
            {row.original.name}
          </Text>
          <Text className="uppercase" as="p" styleVariant="T3">
            {row.original.symbol}
          </Text>
        </div>
      ),
    },
    {
      accessorKey: "current_price",
      header: "Current Price",
      meta: { size: "150px" },
      cell: ({ row }) => (
        <Text className="uppercase min-w-[150px]" as="p" styleVariant="T2">
          <CurrencySymbol />
          {` ${Number(row.getValue("current_price")).toLocaleString()}`}
        </Text>
      ),
    },
    {
      accessorKey: "price_change_percentage_1h_in_currency",
      header: "1h",
      meta: { size: "150px" },
      cell: ({ row }) => {
        const priceChange = row.getValue(
          "price_change_percentage_1h_in_currency"
        ) as number;
        const isUp = priceChange > 0;
        return <PercentageChangeText isUp={isUp} priceChange={priceChange} />;
      },
    },
    {
      accessorKey: "price_change_percentage_24h_in_currency",
      header: "24h",
      meta: { size: "150px" },
      cell: ({ row }) => {
        const priceChange = row.getValue(
          "price_change_percentage_24h_in_currency"
        ) as number;
        const isUp = priceChange > 0;
        return <PercentageChangeText isUp={isUp} priceChange={priceChange} />;
      },
    },
    {
      accessorKey: "price_change_percentage_7d_in_currency",
      header: "7d",
      meta: { size: "150px" },
      cell: ({ row }) => {
        const priceChange = row.getValue(
          "price_change_percentage_7d_in_currency"
        ) as number;
        const isUp = priceChange > 0;
        return <PercentageChangeText isUp={isUp} priceChange={priceChange} />;
      },
    },
    {
      accessorKey: "market_cap",
      header: "Market Cap",
      meta: { size: "200px" },
      cell: ({ row }) => (
        <Text className="uppercase min-w-[200px]" as="p" styleVariant="T2">
          <CurrencySymbol />{" "}
          {Number(row.getValue("market_cap")).toLocaleString()}
        </Text>
      ),
    },
    {
      accessorKey: "ations",
      header: "Action",
      meta: { size: "100px" },
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <Image
            width={24}
            height={24}
            alt="add-transaction"
            src="/icons/add-transaction.svg"
            className="cursor-pointer"
            onClick={() => {
              console.log(row.original);
              setActiveCrypto({
                tokenId: row.original.id,
                name: row.original.name,
                image: row.original.image,
                symbol: row.original.symbol,
                currentPrice: row.original.current_price,
              });
            }}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data: coins,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (marketData) {
      setCoins(marketData);
    }
  }, [marketData]);

  useEffect(() => {
    //If new page adjust

    if (currentPage <= 3) {
      return setActivePageNumbers(DEFAULT_ACTIVE_PAGE_NUMBERS);
    }

    if (currentPage === activePageNumbers[2] + 1) {
      return setActivePageNumbers([
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ]);
    }

    if (currentPage < activePageNumbers[0]) {
      return setActivePageNumbers([
        currentPage - 2,
        currentPage - 1,
        currentPage,
      ]);
    }
  }, [currentPage]);

  const columnWidths = [
    "w-[30px]",
    "w-full",
    "w-[150px]",
    "w-[150px]",
    "w-[150px]",
    "w-[200px]",
    "w-[200px]",
    "w-[100px]",
  ];

  const SkeletonRow = () => (
    <tr>
      {columnWidths.map((width, i) => (
        <td key={i} className="px-2">
          <Skeleton className={`${width} h-[50px] rounded-lg`} />
        </td>
      ))}
    </tr>
  );
  return (
    <div className="bg-card-background w-full p-4">
      <Text as="h1" styleVariant="T1">
        Top Coins
      </Text>
      <div className="relative w-full overflow-auto my-4">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isFirstTwoHeaders = [0, 1].includes(index);
                  return (
                    <th
                      key={header.id}
                      className={`${
                        isFirstTwoHeaders ? "text-left" : "text-right"
                      } table-${
                        header.id
                      } h-[50px] bg-[#F1F3F4] dark:bg-[#262C36] px-2`}
                      style={{
                        //@ts-expect-error meta is dynamic
                        width: header.column.columnDef.meta?.size || "auto",
                      }}
                    >
                      <Text as="h1" styleVariant="T2" className="font-light">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </Text>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {isLoading ? (
            <tbody className="">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map((row, index) => {
                const isEven = index % 2 === 0;
                return (
                  <tr
                    key={row.id}
                    className={`${
                      !isEven && "bg-[#F1F3F4] dark:bg-[#262C36]"
                    } border-b`}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      const isFirstTwo = [0, 1].includes(index);
                      return (
                        <td
                          key={cell.id}
                          className={`h-[50px] ${
                            isFirstTwo ? "text-left" : "text-right"
                          } px-2`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {/*Pagination*/}
      {isPaginated && (
        <div className="pt-4 font-poppins flex flex-row items-center justify-center gap-2">
          <div
            className="border bg-card flex items-center justify-center w-[35px] h-[35px] text-[18px] rounded-lg cursor-pointer bg-gray-50"
            onClick={() => {
              //if first page return
              if (currentPage === 1) return;
              setCurrentPage((prev) => prev - 1);
            }}
          >
            {`<`}
          </div>
          <div className="flex flex-row gap-1 items-center justify-center">
            {activePageNumbers.map((item) => {
              const currentNumber = item;
              const isActive = currentPage === currentNumber;
              return (
                <div
                  className={`cursor-pointer flex items-center justify-center w-[35px] h-[35px] rounded-lg border ${
                    isActive ? "bg-primary text-white" : "bg-gray-50"
                  }`}
                  key={item}
                  onClick={() => {
                    setCurrentPage(currentNumber);
                  }}
                >
                  {currentNumber}
                </div>
              );
            })}
            <div>...</div>
          </div>
          <div
            className="border  flex items-center justify-center w-[35px] h-[35px] text-[18px] rounded-lg cursor-pointer bg-gray-50"
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
          >
            {`>`}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTable;
