
import {
  ScanSearch,
  Send,
  CircleDollarSign,
  Clock,
  TrendingUp,
  ShieldCheck,
  Layers,
  Network,
  Database,
  Lock,
  Receipt,
  LucideIcon
} from "lucide-react";

export interface TimelineStepData {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const mt4mt5Timeline: TimelineStepData[] = [
  {
    icon: ScanSearch,
    title: "Market Scan",
    desc: "AI scans Forex pairs & indices for patterns.",
  },
  {
    icon: Send,
    title: "Trade Signal",
    desc: "High-probability setup detected.",
  },
  {
    icon: CircleDollarSign,
    title: "Risk-Managed Entry",
    desc: "Position sized based on account equity.",
  },
  {
    icon: Clock,
    title: "Real-time Monitoring",
    desc: "AI adjusts stop-loss and take-profit.",
  },
  {
    icon: TrendingUp,
    title: "Optimal Exit",
    desc: "Position closed based on market conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Account Sync",
    desc: "Trade results instantly reflected in MT4/5.",
  },
];

const cryptoTimeline: TimelineStepData[] = [
  {
    icon: Layers,
    title: "Cross-Exchange Scan",
    desc: "AI scans 150+ markets for misprices.",
  },
  {
    icon: Network,
    title: "Arbitrage Detected",
    desc: "Viable price gap found between exchanges.",
  },
  {
    icon: Database,
    title: "Funds Allocation",
    desc: "Capital assigned, risk auto-balanced.",
  },
  {
    icon: Lock,
    title: "Split-second Execution",
    desc: "Smart contract locks instant pricing.",
  },
  {
    icon: TrendingUp,
    title: "Profit Capture",
    desc: "Positions closed the moment edge fades.",
  },
  {
    icon: Receipt,
    title: "Settlement & Audit",
    desc: "Every trade logged, funds authenticated.",
  },
];

export const agentData = {
  mt: {
    title: "For MT4 / MT5",
    description: "Automate your strategies with our AI agents directly on the world's most popular trading platforms. Seamless integration, powerful execution.",
    timeline: mt4mt5Timeline,
    theme: "green"
  },
  crypto: {
    title: "For Crypto Arbitrage",
    description: "Capitalize on market inefficiencies. Our crypto arbitrage bot scans hundreds of pairs across multiple exchanges to find and execute profitable trades.",
    timeline: cryptoTimeline,
    theme: "gold"
  }
};
