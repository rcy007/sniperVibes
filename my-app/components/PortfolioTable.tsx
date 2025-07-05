"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card } from "@/components/ui";

// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

export type Holding = {
  id: string;
  symbol: string;
  quantity: number;
  avg_price: number | null;
  current_price: number | null;
  source?: string | null;
  buy_date?: string | null;
};

const columns: ColumnDef<Holding>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
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
    accessorKey: "current_price",
    header: "Current Price",
    cell: (info) => (info.getValue() ? `$${info.getValue()}` : "-") as any,
  },
  {
    id: "pl",
    header: "P/L",
    cell: ({ row }) => {
      const avg = row.original.avg_price ?? 0;
      const current = row.original.current_price ?? 0;
      const pl = (current - avg) * row.original.quantity;
      const color = pl >= 0 ? "text-green-500" : "text-red-500";
      return <span className={color}>{pl.toFixed(2)}</span>;
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