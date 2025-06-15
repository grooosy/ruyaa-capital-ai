
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useLiveMarketData } from "@/hooks/useLiveMarketData";

const LiveMarketChart: React.FC = () => {
  const marketData = useLiveMarketData();

  return (
    <div className="relative w-full max-w-xl mx-auto h-14 flex items-center mb-12">
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none bg-gradient-to-r from-transparent via-green/0 to-transparent z-10" />
      <ResponsiveContainer width="100%" height={48}>
        <LineChart data={marketData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#16C784"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="absolute left-3 top-2 text-gold text-sm font-semibold bg-[#181711f3] rounded-md px-2 py-0.5 z-20 shadow-gold-glow select-none pointer-events-none border border-gold/60 tracking-wide">
        BTC/USDT
      </div>
      <div className="absolute right-6 top-2 flex flex-col items-end z-20 select-none">
        <span className="font-bold text-green text-base">
          ${marketData.at(-1)?.value.toFixed(2)}
        </span>
        <span className="text-xs text-gray-400 font-medium mt-0.5">
          Live · 
          <span className="animate-pulse ml-1 text-green">●</span>
        </span>
      </div>
    </div>
  );
};

export default LiveMarketChart;
