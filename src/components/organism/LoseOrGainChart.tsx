"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Text from "@/components/atoms/Text";
import { PortfolioHistoryDataType } from "@/types";
import { format, subDays, parseISO } from "date-fns";
import CurrencySymbol from "@/components/atoms/CurrencySymbol";
import { handleConvertToCurrency } from "@/lib/numbers";
import currencyStore from "@/context/currencyStore";
import Combobox from "@/components/atoms/Combobox";
import { OVERVIEW_OPTIONS } from "@/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
  // Legend
);

const LoseOrGainChart: React.FC<{
  dataHistory: PortfolioHistoryDataType[];
  total: number;
  usdtPrice: number;
  percentageChange: number;
  gainOrLoss: number;
  overviewValue: string;
  setOverviewValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  dataHistory,
  total,
  usdtPrice,
  percentageChange,
  gainOrLoss,
  overviewValue,
  setOverviewValue,
}) => {
  const [chartData, setChartData] = useState<PortfolioHistoryDataType[]>([]);
  const labels = chartData?.map((entry) => entry.date);
  const values = chartData?.map((entry) => entry.value);
  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        data: values,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  // const [overviewValue, setOverviewValue] = useState(OVERVIEW_OPTIONS[0].value);
  const { currency } = currencyStore();

  const options = {
    responsive: true,
    maintainAspectRatio: false, // disables aspect lock so height can be custom

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        // text: "Chart.js Line Chart",
      },
    },
  };

  useEffect(() => {
    if (!dataHistory.length) return;
    formatDataHistory();
  }, [dataHistory]);

  const formatDataHistory = () => {
    const placeholdersNeeded = Math.max(0, 7 - dataHistory.length);
    const baseDate = dataHistory[0].date;
    const pastDays = getPastDays(baseDate, placeholdersNeeded);
    const placeholders = Array.from(
      { length: placeholdersNeeded },
      (_, index) => {
        return {
          value: 0,
          date: pastDays[index],
        };
      }
    );

    const formattedDataHistory = dataHistory.map((item) => {
      const date = new Date(item.date);
      const options = { month: "long", day: "numeric" } as const;
      const formattedDate = date.toLocaleDateString("en-US", options);
      return {
        value: item.value,
        date: formattedDate,
      };
    });

    return setChartData([...placeholders, ...formattedDataHistory]);
  };

  const getPastDays = (dateStr: string, days: number): string[] => {
    const base = subDays(parseISO(dateStr), 1); // go back one day

    return Array.from({ length: days }, (_, i) =>
      format(subDays(base, days - 1 - i), "MMMM d")
    );
  };

  const convertedValue = handleConvertToCurrency(
    currency,
    Number(total),
    usdtPrice
  );

  const gainorLossValue = handleConvertToCurrency(
    currency,
    Number(gainOrLoss),
    usdtPrice
  );

  const isNegative = gainorLossValue <= 0;
  return (
    <div className="bg-card-background rounded-lg p-4">
      <div className="py-4 max-w-[220px]">
        <Text as="h1" styleVariant="T2">
          Est total value
        </Text>
        <div className="flex flex-row gap-1 items-center justify-start text-[36px] font-bold">
          <CurrencySymbol />
          <Text as="h1" styleVariant="T2" className="text-[36px]">
            {convertedValue.toLocaleString()}
          </Text>
        </div>
        <div
          className={`flex flex-row items-center justify-start gap-1 ${
            isNegative ? "text-error" : "text-success"
          }`}
        >
          <p>{`${isNegative ? "-" : "+"} ${gainorLossValue.toFixed(2)}`}</p>
          <Text
            as="h1"
            styleVariant="T2"
            className={`${isNegative ? "text-error" : "text-success"}`}
          >
            {`(${percentageChange.toFixed(2)}%)`}
          </Text>
          {/* <Stats value={percentageChange} /> */}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <Text
          as="h1"
          styleVariant="T1"
          className="flex flex-row items-center font-medium"
        >
          {`${overviewValue} Portfolio Overview`}
        </Text>
        <Combobox
          options={OVERVIEW_OPTIONS}
          value={overviewValue}
          setValue={setOverviewValue}
          width="w-[150px]"
        />
      </div>
      <div className="w-full h-[400px] py-6">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LoseOrGainChart;
