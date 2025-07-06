import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import PortfolioTable from "@/components/PortfolioTable";
import PortfolioUpload from "@/components/PortfolioUpload";
import type { Holding } from "@/components/PortfolioTable";
import { Card } from "@/components/ui";
import { LogOut, ArrowRight } from "lucide-react";

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
    .select("id, user_email, symbol, quantity, avg_price, source, buy_date")
    .order("symbol", { ascending: true });

  if (error) throw new Error(error.message);

  const totalInvested = holdings?.reduce((acc, h) => {
    if (h.avg_price == null) return acc;
    return acc + h.avg_price * h.quantity;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="group relative px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out overflow-hidden cursor-pointer"
          >
            <div className="flex items-center space-x-2 relative z-10">
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Sign Out
              </span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </button>
        </form>
      </div>

      <Card className="p-4 bg-white/60 dark:bg-black/40 backdrop-blur-xs shadow-sm rounded-xl">
        <p className="text-sm font-medium">Total Invested</p>
        <p className="text-3xl font-bold text-blue-600">
          ${totalInvested?.toFixed(2) ?? "0.00"}
        </p>
      </Card>

      {holdings && holdings.length > 0 && <PortfolioTable data={holdings as Holding[]} />}

      <PortfolioUpload />
    </div>
  );
} 