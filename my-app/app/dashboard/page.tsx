import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import PortfolioTable from "@/components/PortfolioTable";
import PriceChart from "@/components/PriceChart";
import PortfolioUpload from "@/components/PortfolioUpload";
import type { Holding } from "@/components/PortfolioTable";
import { Card } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: holdings, error } = await supabase
    .from("holdings")
    .select("id, symbol, quantity, avg_price, current_price, source, buy_date")
    .order("symbol", { ascending: true });

  if (error) throw new Error(error.message);

  const totalPL = holdings?.reduce((acc, h) => {
    if (h.current_price == null || h.avg_price == null) return acc;
    return acc + (h.current_price - h.avg_price) * h.quantity;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>

      <Card className="p-4 bg-white/60 dark:bg-black/40 backdrop-blur-xs shadow-sm rounded-xl">
        <p className="text-sm font-medium">Total P/L</p>
        <p className={`text-3xl font-bold ${totalPL && totalPL > 0 ? "text-green-500" : "text-red-500"}`}>
          {totalPL?.toFixed(2) ?? "-"}
        </p>
      </Card>

      {holdings && holdings.length > 0 && <PortfolioTable data={holdings as Holding[]} />}

      <PortfolioUpload />
    </div>
  );
} 