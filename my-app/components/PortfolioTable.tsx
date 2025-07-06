"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card } from "@/components/ui";
import MiniPriceChart from "./MiniPriceChart";

// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

export type Holding = {
  id: string;
  user_email: string;
  symbol: string;
  quantity: number;
  avg_price: number | null;
  source?: string | null;
  buy_date?: string | null;
};

// Mock price data generator for demo purposes
const generateMockPriceData = (symbol: string, avgPrice: number) => {
  const days = 30;
  const data = [];
  let currentPrice = avgPrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some realistic price variation
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    currentPrice = avgPrice * (1 + variation);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.max(currentPrice, 0.01) // Ensure positive price
    });
  }
  
  return data;
};

const columns: ColumnDef<Holding>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => {
      const [showChart, setShowChart] = useState(false);
      const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
      const symbol = row.original.symbol;
      const avgPrice = row.original.avg_price || 0;
      const mockData = generateMockPriceData(symbol, avgPrice);
      
      const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setTimeoutId(setTimeout(() => setShowChart(true), 200));
      };
      
      const handleMouseLeave = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setShowChart(false);
      };
      
      return (
        <div 
          className="relative cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
            {symbol}
          </span>
          
          {/* Hover Chart Tooltip */}
          {showChart && (
            <div className="absolute z-50 top-full left-0 mt-2">
              <MiniPriceChart data={mockData} symbol={symbol} />
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: "avg_price",
    header: "Avg Price",
    cell: (info) => (info.getValue() ? `$${info.getValue()}` : "-") as any,
  },
  {
    id: "total_invested",
    header: "Total Invested",
    cell: ({ row }) => {
      const avg = row.original.avg_price ?? 0;
      const total = avg * row.original.quantity;
      return <span>${total.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: (info) => (info.getValue() ? info.getValue() : "-") as any,
  },
  {
    accessorKey: "buy_date",
    header: "Buy Date",
    cell: (info) => {
      const date = info.getValue() as string;
      if (!date) return "-";
      
      // Use a consistent date format to avoid hydration mismatch
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${month}/${day}/${year}`;
    },
  },
];

interface Props {
  data: Holding[];
}

export default function PortfolioTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="overflow-auto bg-white/60 dark:bg-black/40 backdrop-blur-xs shadow-sm rounded-xl">
      <table className="min-w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-left font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-black/[0.03] dark:odd:bg-white/[0.04]">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-1.5 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
} 