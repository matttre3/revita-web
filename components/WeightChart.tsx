"use client";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Database } from "../database.types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type WeightChartProps = {
  weightLogs: Database["public"]["Tables"]["weightLogs"]["Row"][];
};

const WeightChart = ({ weightLogs }: WeightChartProps) => {
  const dates = weightLogs.map((entry) => entry.date);
  const weights = weightLogs.map((entry) => entry.weight);

  const data = {
    legend: {
      display: false,
    },
    labels: dates,
    datasets: [
      {
        label: "",
        data: weights,
        borderColor: "#C52E38",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Peso (kg)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Data",
        },
      },
    },
  };

  return (
    <div className="w-full lg:w-2/3">
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightChart;
