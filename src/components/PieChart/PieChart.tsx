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

  const percentToNumber = (percent: string): number =>
    Number(percent.replace("%", ""));

  const tailwindColors = [
    colors.green["500"],
    colors.blue["500"],
    colors.red["500"],
    colors.yellow["500"],
    colors.purple["500"],
    colors.pink["500"],
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
        position: "top" as LabelPosition,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
        },
      },
    },
  };

  return (
    <div>
      <Pie data={chartData} options={{ ...options }} />
    </div>
  );
};

Chart.register(ArcElement, CategoryScale, Legend, Tooltip, Title);

export { PieChart };
