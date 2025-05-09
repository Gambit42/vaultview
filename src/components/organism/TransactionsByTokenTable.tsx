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
import { handleConvertToCurrency } from "@/lib/numbers";
import authClientInterceptor from "@/lib/authClientInterceptor";
import useGetUserTransactionsByTokenId from "@/hooks/useGetUserTransactionsByTokenId";
import { Button } from "@/components/ui/button";

const TransactionsByTokenTable: React.FC<{
  usdtPrice: number;
  currentTokenId: string;
  setCurrentTokenId: (value: string) => void;
}> = ({ usdtPrice, currentTokenId, setCurrentTokenId }) => {
  const [coins, setCoins] = useState<any>([]);

  const { currency } = currencyStore();

  const { data: marketData, refetch } =
    useGetUserTransactionsByTokenId(currentTokenId);

  useEffect(() => {
    console.log("CURRENT", currentTokenId);
    refetch();
  }, [currentTokenId]);

  useEffect(() => {
    if (marketData) {
      setCoins(marketData);
    }
  }, [marketData]);

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      const result = await authClientInterceptor.post(
        `/api/user/transactions/delete/by-id`,
        {
          transactionId: transactionId,
        }
      );

      console.log("result", result);
    } catch (error) {
      console.log("err", error);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      // meta: { size: "200px" },
      cell: ({ row }) => (
        <div
          className="flex flex-row items-center gap-2 min-w-[150px]"
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
          <div className="flex flex-row items-end justify-end min-w-[150px]">
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
      header: "Amount",
      meta: { size: "150px" },
      cell: ({ row }) => {
        return (
          <div className="flex flex-col items-end justify-end min-w-[150px]">
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
        <div className="flex items-center justify-end space-x-2 min-w-[150px]">
          <Image
            width={24}
            height={24}
            alt="delete-transaction"
            src="/icons/trash-icon.svg"
            className="cursor-pointer"
            onClick={() => {
              console.log(row.original);
              handleDeleteTransaction(row.original._id);
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

  return (
    <div className="bg-card-background w-full p-4">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center justify-center gap-2">
          <Text as="h1" styleVariant="T1" className="capitalize">
            {`${currentTokenId} transactions`}
          </Text>
        </div>
        <Button
          onClick={() => {
            setCurrentTokenId("");
          }}
        >
          Back
        </Button>
      </div>

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

export default TransactionsByTokenTable;
