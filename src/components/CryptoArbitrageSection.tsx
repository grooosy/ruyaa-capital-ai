
import React from "react";
import { ArrowDown, ScanSearch, Send, CircleDollarSign, Clock, TrendingUp, ShieldCheck } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// Dummy live-market data (sinusoidal, updates to show motion)
const useLiveMarketData = () => {
  const [data, setData] = React.useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      time: i,
      value: 1660 + 22 * Math.sin(i / 4),
    }))
  );
  React.useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1).concat({
          time: prev[prev.length - 1].time + 1,
          value:
            1660 +
            22 *
              Math.sin((prev[prev.length - 1].time + 1) / 4 + Date.now() / 7000),
        });
        return next;
      });
    }, 950);
    return () => clearInterval(id);
  }, []);
  return data;
};

const TIMELINE = [
  {
    icon: ScanSearch,
    title: "Opportunity Scan",
    desc: "AI scans 150+ markets for misprices.",
  },
  {
    icon: Send,
    title: "Trade Signal",
    desc: "Arb detected: trade route calculated.",
  },
  {
    icon: CircleDollarSign,
    title: "Funds Allocation",
    desc: "Capital assigned, risk auto-balanced.",
  },
  {
    icon: Clock,
    title: "Split-second Execution",
    desc: "Smart contract locks instant pricing.",
  },
  {
    icon: TrendingUp,
    title: "Profit Capture",
    desc: "Positions closed the moment edge fades.",
  },
  {
    icon: ShieldCheck,
    title: "Settlement & Audit",
    desc: "Every trade logged, funds authenticated.",
  },
];

const CryptoArbitrageSection: React.FC = () => {
  const marketData = useLiveMarketData();
  return (
    <section
      id="arbitrage"
      className="w-full max-w-4xl mx-auto mt-24 px-4"
      style={{ scrollMarginTop: 120 }}
    >
      <div className="mb-7 flex flex-col items-center gap-2">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
          Crypto Arbitrage Flow
        </h2>
        <span className="text-green text-lg uppercase font-semibold tracking-widest">
          Institutional Process, Automated
        </span>
      </div>
      {/* LIVE MARKET MINI TICKER */}
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
      {/* TIMELINE */}
      <div className="relative flex flex-col md:flex-row md:items-start md:gap-0 gap-8 md:justify-between mt-4">
        {/* Vertical line for timeline */}
        <div className="hidden md:block absolute left-1/2 top-10 bottom-3 w-1 -translate-x-1/2 bg-gradient-to-b from-green/60 via-gold/60 to-gold/0 opacity-70 rounded-xl pointer-events-none" style={{ height: "calc(100% - 54px)", minHeight: 210, zIndex: 0 }} />
        {TIMELINE.map((step, i) => (
          <div
            key={i}
            className="relative z-10 flex md:flex-col items-center md:items-center md:w-1/6 w-full gap-4 md:gap-0"
            style={{ minWidth: 120 }}
          >
            {/* Icon in ring */}
            <div className="relative flex items-center justify-center md:mb-3 mb-0">
              <div
                className={`rounded-full border-2 border-green bg-[#23221c]
                  shadow-green-glow w-14 h-14 flex items-center justify-center`}
                style={{
                  boxShadow: "0 0 18px #16C78433",
                }}
              >
                <step.icon size={28} color="#16C784" />
              </div>
              {/* Connector arrow */}
              {i < TIMELINE.length - 1 && (
                <span className="hidden md:flex absolute left-1/2 bottom-[-32px] -translate-x-1/2 z-20">
                  <ArrowDown size={18} strokeWidth={2.2} className="text-gold" />
                </span>
              )}
            </div>
            {/* Caption */}
            <div className="flex flex-col items-center md:mt-2 mt-0">
              <span className="font-semibold text-white text-base md:text-md text-center">
                {step.title}
              </span>
              <span className="text-gray-400 text-xs mt-1 leading-tight text-center max-w-[125px]">{step.desc}</span>
            </div>
            {/* Horizontal arrow for mobile only */}
            {i < TIMELINE.length - 1 && (
              <span className="md:hidden flex px-2">
                <ArrowDown size={16} strokeWidth={2.2} className="rotate-90 text-gold" />
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CryptoArbitrageSection;

