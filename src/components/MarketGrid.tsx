
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";

// Local modal for chart
const useModal = () => {
  const [data, setData] = React.useState<any>(null);
  const open = (asset: any) => setData(asset);
  const close = () => setData(null);
  return { data, open, close };
};

const fetchMarket = async () => {
  const res = await fetch("/functions/v1/market-stream");
  if (!res.ok) throw new Error("Failed to fetch market data");
  return res.json();
};

const rowColors = ["bg-[#111111]", "bg-[#161616]"];

function formatPrice(p: number) {
  if (p === null || p === undefined) return "--";
  return "$" + p.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
function formatChange(c: number) {
  if (c === null || c === undefined) return "--";
  return (c >= 0 ? "+" : "") + c.toFixed(2) + "%";
}

const MiniSparkline: React.FC<{ points: number[]; positive: boolean }> = ({ points, positive }) => (
  <ResponsiveContainer width="100%" height={36}>
    <AreaChart data={points.map((y, i) => ({ x: i, y }))}>
      <Area
        type="monotone"
        dataKey="y"
        stroke="#00FF9D"
        strokeWidth={2}
        fill="url(#neonFill)"
        dot={false}
        isAnimationActive
      />
      <defs>
        <linearGradient id="neonFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FF9D" stopOpacity={0.42} />
          <stop offset="100%" stopColor="#181711" stopOpacity={0.07} />
        </linearGradient>
      </defs>
    </AreaChart>
  </ResponsiveContainer>
);

const MarketGrid: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["market-stream"],
    queryFn: fetchMarket,
    refetchInterval: 5000,
    staleTime: 3000,
  });
  const modal = useModal();

  // Animate number change with framer-motion
  const MotionTD = ({ value, children, ...rest }: any) => (
    <motion.td
      layout
      transition={{ duration: 0.3 }}
      {...rest}
      className={(rest.className ?? "") + " px-3 py-2 align-middle"}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 3 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </motion.td>
  );

  return (
    <div className="relative w-full max-w-xl mx-auto bg-[#1A1A1A] backdrop-blur-sm border border-green-400/30 shadow-lg rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg lg:text-2xl text-gradient-ai">Market Grid</h2>
        <span className="text-sm text-green-400/80 select-none">Live •</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-1">
          <thead>
            <tr className="text-neutral-400 text-xs">
              <th className="text-left px-3 pb-2 font-normal">Symbol</th>
              <th className="text-left px-3 pb-2 font-normal">Name</th>
              <th className="text-right px-3 pb-2 font-normal">Price (USD)</th>
              <th className="text-right px-3 pb-2 font-normal">24h %</th>
              <th className="text-center px-3 pb-2 font-normal">Chart</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className={rowColors[i % 2] + " rounded-lg"}>
                      <td colSpan={5}>
                        <Skeleton className="h-10 w-full rounded-lg" />
                      </td>
                    </tr>
                  ))
              : (data ?? []).map((asset: any, i: number) => {
                  const positive = asset.change24hPct >= 0;
                  return (
                    <motion.tr
                      key={asset.symbol}
                      className={
                        (rowColors[i % 2]) +
                        " group transition-colors rounded-lg cursor-pointer hover:shadow-neon hover:ring-2 hover:ring-green-400 hover:z-10"
                      }
                      layout
                      onClick={() => modal.open(asset)}
                      whileHover={{ scale: 1.01 }}
                    >
                      <td className="px-3 py-2 font-semibold text-neutral-200">{asset.symbol}</td>
                      <td className="px-3 py-2 text-neutral-400">{asset.name}</td>
                      <MotionTD value={asset.price} className="font-mono text-lg font-bold text-white text-right">
                        {formatPrice(asset.price)}
                      </MotionTD>
                      <MotionTD
                        value={asset.change24hPct}
                        className={"text-right font-semibold " + (positive ? "text-green-400" : "text-red-500")}
                      >
                        {formatChange(asset.change24hPct)}
                      </MotionTD>
                      <td className="py-1 px-1 w-36">
                        <MiniSparkline points={asset.sparkline} positive={positive} />
                      </td>
                    </motion.tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {/* Modal w/ 7d chart */}
      <AnimatePresence>
        {modal.data && (
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={modal.close}
          >
            <motion.div
              className="bg-[#131313] rounded-2xl border border-green-400/30 shadow-neon p-6 max-w-sm w-full relative"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl text-white font-bold mb-2">{modal.data.name} ({modal.data.symbol})</h3>
              <div className="font-medium text-lg pb-2">{formatPrice(modal.data.price)} <span className={modal.data.change24hPct >= 0 ? "text-green-400" : "text-red-500"}>({formatChange(modal.data.change24hPct)})</span></div>
              <div className="mt-2 mb-6 w-full h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={modal.data.sparkline.map((y: number, i: number) => ({ x: i, y }))}>
                    <Area
                      type="monotone"
                      dataKey="y"
                      stroke="#00FF9D"
                      strokeWidth={2.5}
                      fill="url(#neonFillModal)"
                      dot={false}
                      isAnimationActive={true}
                    />
                    <defs>
                      <linearGradient id="neonFillModal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00FF9D" stopOpacity={0.28} />
                        <stop offset="100%" stopColor="#181711" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <button
                className="btn-neongreen w-full mx-auto mt-2 flex items-center justify-center text-base py-3 px-6 rounded-full font-bold transition-all"
                onClick={() => {
                  window.open("https://www.binance.com/", "_blank", "noopener,noreferrer");
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" /> Trade Now
              </button>
              <button
                aria-label="Close"
                onClick={modal.close}
                className="absolute right-3.5 top-3.5 text-green-400/70 hover:text-green-400/100 transition text-xl"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketGrid;
