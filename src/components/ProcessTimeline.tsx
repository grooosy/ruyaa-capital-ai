
import React from "react";
import {
  ScanSearch,
  Send,
  CircleDollarSign,
  Clock,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import TimelineStep from "@/components/TimelineStep";

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

const ProcessTimeline: React.FC = () => {
  return (
    <div className="relative flex flex-col md:flex-row md:items-start md:gap-0 gap-8 md:justify-between mt-4">
      {/* Vertical line for timeline */}
      <div 
        className="hidden md:block absolute left-1/2 top-10 bottom-3 w-1 -translate-x-1/2 bg-gradient-to-b from-green/60 via-gold/60 to-gold/0 opacity-70 rounded-xl pointer-events-none" 
        style={{ 
          height: "calc(100% - 54px)", 
          minHeight: 210, 
          zIndex: 0 
        }} 
      />
      {TIMELINE.map((step, i) => (
        <TimelineStep
          key={i}
          icon={step.icon}
          title={step.title}
          desc={step.desc}
          index={i}
          isLast={i === TIMELINE.length - 1}
        />
      ))}
    </div>
  );
};

export default ProcessTimeline;
