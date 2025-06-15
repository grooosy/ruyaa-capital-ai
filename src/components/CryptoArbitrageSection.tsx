
import React from "react";
import LiveMarketChart from "@/components/LiveMarketChart";
import ProcessTimeline from "@/components/ProcessTimeline";

const CryptoArbitrageSection: React.FC = () => {
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
      <LiveMarketChart />
      
      {/* TIMELINE */}
      <ProcessTimeline />
    </section>
  );
};

export default CryptoArbitrageSection;
