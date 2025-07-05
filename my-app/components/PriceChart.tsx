"use client";

import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Brush,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui";

// @ts-nocheck

interface Point {
  date: string;
  price: number;
}

interface Props {
  data: Point[];
  title?: string;
}

export default function PriceChart({ data, title }: Props) {
  return (
    <Card className="p-4 bg-white/60 dark:bg-black/40 backdrop-blur-xs shadow-sm rounded-xl w-full h-64">
      {title && <h3 className="text-sm mb-2 font-medium">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide={false} />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
          <Brush dataKey="date" height={20} stroke="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
} 