import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import React, { FC } from "react";
import { Pie } from "react-chartjs-2";

import { colors } from "@/constants/colors";

import type { LabelPosition, PieChartProps } from "./types";

const PieChart: FC<PieChartProps> = (props) => {
  const { questionName, data } = props;

  // Convert percentage string to number
  const percentToNumber = (percent: string): number =>
    Number(percent.replace("%", ""));

  // The tailwind colors to use for the pie chart, you can use more colors or change them as per your needs
  const tailwindColors = [
    colors.green["500"],
    colors.blue["500"],
    colors.red["500"],
    colors.yellow["500"],
    colors.purple["500"],
  ];

  const chartData = {
    labels: data.map((item) => item.value),
    datasets: [
      {
        data: data.map((item) => percentToNumber(item.answers)),
        backgroundColor: tailwindColors,
        borderColor: tailwindColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: questionName,
      },
      legend: {
        position: "right" as LabelPosition,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="h-[175px] w-[175px]">
      <Pie data={chartData} options={{ ...options }} />
    </div>
  );
};

Chart.register(ArcElement, CategoryScale, Legend, Tooltip, Title);

export { PieChart };
