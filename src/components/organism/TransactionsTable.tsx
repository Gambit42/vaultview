import React, { useEffect, useState } from "react";
import Text from "@/components/atoms/Text";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import PercentageChangeText from "@/components/molecules/PercentageChangeText";
import CurrencySymbol from "@/components/atoms/CurrencySymbol";
import currencyStore from "@/context/currencyStore";
import activeCryptoStore from "@/context/activeCryptoStore";
import authClientInterceptor from "@/lib/authClientInterceptor";
import useGetUserTransactions from "@/hooks/useGetUserTransactions";
import { handleConvertToCurrency } from "@/lib/numbers";

const TransactionsTable: React.FC<{ usdtPrice: number }> = ({ usdtPrice }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coins, setCoins] = useState<any>([]);
  const { setActiveCrypto } = activeCryptoStore();
  const { currency } = currencyStore();

  const { data: marketData } = useGetUserTransactions(currentPage);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      // meta: { size: "200px" },
      cell: ({ row }) => (
        <div
          className="flex flex-row items-center gap-2 "
          onClick={() => {
            console.log(row.original);
          }}
        >
          <Image
            width={24}
            height={24}
            className="rounded-full"
            src={row.original.image}
            alt="coin-image"
          />
          <Text className="uppercase font-medium" as="p" styleVariant="T3">
            {row.original.name}
          </Text>
          <Text className="uppercase" as="p" styleVariant="T3">
            {row.original.symbol}
          </Text>
        </div>
      ),
    },
    {
      accessorKey: "percentage_change",
      header: "Gain / Loss",
      meta: { size: "150px" },
      cell: ({ row }) => {
        const isUp = row.original.gainOrLoss > 0;
        return (
          <PercentageChangeText
            isUp={isUp}
            priceChange={row.original.gainOrLossPercentage}
          />
        );
      },
    },
    {
      accessorKey: "totalValue",
      header: "Total Value",
      meta: { size: "150px" },
      cell: ({ row }) => {
        const totalAmount =
          Number(row.original.currentPrice) * Number(row.original.totalAmount);

        const convertedValue = handleConvertToCurrency(
          currency,
          Number(totalAmount),
          usdtPrice
        );
        return (
          <div className="flex flex-row items-end justify-end">
            <CurrencySymbol />
            <Text className="uppercase" as="p" styleVariant="T2">
              {`${convertedValue.toLocaleString()}`}
            </Text>
          </div>
        );
      },
    },
    {
      accessorKey: "holdings",
      header: "Holdings",
      meta: { size: "150px" },
      cell: ({ row }) => {
        return (
          <div className="flex flex-col items-end justify-end">
            <Text className="uppercase" as="p" styleVariant="T2">
              {` ${Number(row.original.totalAmount).toLocaleString()} ${
                row.original.symbol
              }`}
            </Text>
          </div>
        );
      },
    },

    {
      accessorKey: "ations",
      header: "Action",
      meta: { size: "150px" },
      cell: ({ row }) => (
        <div className="flex items-center justify-end space-x-2">
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
          <Image
            width={24}
            height={24}
            alt="delete-transaction"
            src="/icons/trash-icon.svg"
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

  return (
    <div className="bg-card-background w-full p-4">
      <Text as="h1" styleVariant="T1">
        Your Transactions
      </Text>

      <div className="relative w-full overflow-auto my-4">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isFirstTwoHeaders = [0].includes(index);
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
                      <Text
                        as="h1"
                        styleVariant="T2"
                        className={`font-light ${
                          isFirstTwoHeaders ? "" : "text-right"
                        }`}
                      >
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
                        className={`h-[80px] ${
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
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
