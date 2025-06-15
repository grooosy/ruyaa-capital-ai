
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
import { mt4mt5Logo, cryptoLogos } from "./logos";

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

export const cryptoArbitrageTimeline: TimelineStepData[] = [
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

const cryptoTimeline: TimelineStepData[] = [
  {
    icon: ScanSearch,
    title: "On-Chain Analysis",
    desc: "AI analyzes blockchain data for signals."
  },
  {
    icon: Send,
    title: "Signal Generation",
    desc: "Identifies a high-potential token or trend."
  },
  {
    icon: CircleDollarSign,
    title: "Smart Entry",
    desc: "Executes trade via decentralized exchanges."
  },
  {
    icon: Clock,
    title: "Portfolio Monitoring",
    desc: "Tracks assets across wallets and protocols."
  },
  {
    icon: TrendingUp,
    title: "Dynamic Exit",
    desc: "Sells based on profit targets or reversals."
  },
  {
    icon: ShieldCheck,
    title: "Secure Settlement",
    desc: "Funds secured in your non-custodial wallet."
  }
];

export const agentData = {
  mt: {
    title: "For MT4 / MT5",
    description: "Automate your strategies with our AI agents directly on the world's most popular trading platforms. Seamless integration, powerful execution.",
    timeline: mt4mt5Timeline,
    theme: "green",
    logos: [
      mt4mt5Logo,
      { src: "placeholder_visa", alt: "Visa" },
      { src: "placeholder_mastercard", alt: "Mastercard" },
      { src: "placeholder_phantom", alt: "Phantom" },
    ],
  },
  crypto: {
    title: "For Crypto Trading",
    description: "Capitalize on market movements. Our crypto agents analyze on-chain data and market trends to execute trades on decentralized exchanges.",
    timeline: cryptoTimeline,
    theme: "gold",
    logos: cryptoLogos,
  }
};
