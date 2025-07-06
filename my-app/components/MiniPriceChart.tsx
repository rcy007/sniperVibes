"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Point {
  date: string;
  price: number;
}

interface Props {
  data: Point[];
  symbol: string;
}

export default function MiniPriceChart({ data, symbol }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500">No price data available</p>
      </div>
    );
  }

  return (
    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-[180px] max-w-[220px]">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-semibold text-gray-900 dark:text-white">{symbol}</h4>
        <span className="text-xs text-gray-500">
          ${data[data.length - 1]?.price?.toFixed(2) || "N/A"}
        </span>
      </div>
      <div className="h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <XAxis 
              dataKey="date" 
              hide={true}
              tick={{ fontSize: 8 }}
            />
            <YAxis 
              hide={true}
              domain={["dataMin", "dataMax"]}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, "Price"]}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                fontSize: "10px"
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 2, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>${Math.min(...data.map(d => d.price)).toFixed(2)}</span>
        <span>${Math.max(...data.map(d => d.price)).toFixed(2)}</span>
      </div>
    </div>
  );
} 