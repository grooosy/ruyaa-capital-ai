
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
  description: string;
}

const mt4mt5Timeline: TimelineStepData[] = [
  {
    icon: ScanSearch,
    title: "Market Scan",
    description: "AI scans Forex pairs & indices for patterns.",
  },
  {
    icon: Send,
    title: "Trade Signal",
    description: "High-probability setup detected.",
  },
  {
    icon: CircleDollarSign,
    title: "Risk-Managed Entry",
    description: "Position sized based on account equity.",
  },
  {
    icon: Clock,
    title: "Real-time Monitoring",
    description: "AI adjusts stop-loss and take-profit.",
  },
  {
    icon: TrendingUp,
    title: "Optimal Exit",
    description: "Position closed based on market conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Account Sync",
    description: "Trade results instantly reflected in MT4/5.",
  },
];

export const cryptoArbitrageTimeline: TimelineStepData[] = [
  {
    icon: Layers,
    title: "Cross-Exchange Scan",
    description: "AI scans 150+ markets for misprices.",
  },
  {
    icon: Network,
    title: "Arbitrage Detected",
    description: "Viable price gap found between exchanges.",
  },
  {
    icon: Database,
    title: "Funds Allocation",
    description: "Capital assigned, risk auto-balanced.",
  },
  {
    icon: Lock,
    title: "Split-second Execution",
    description: "Smart contract locks instant pricing.",
  },
  {
    icon: TrendingUp,
    title: "Profit Capture",
    description: "Positions closed the moment edge fades.",
  },
  {
    icon: Receipt,
    title: "Settlement & Audit",
    description: "Every trade logged, funds authenticated.",
  },
];

const cryptoTimeline: TimelineStepData[] = [
  {
    icon: ScanSearch,
    title: "On-Chain Analysis",
    description: "AI analyzes blockchain data for signals."
  },
  {
    icon: Send,
    title: "Signal Generation",
    description: "Identifies a high-potential token or trend."
  },
  {
    icon: CircleDollarSign,
    title: "Smart Entry",
    description: "Executes trade via decentralized exchanges."
  },
  {
    icon: Clock,
    title: "Portfolio Monitoring",
    description: "Tracks assets across wallets and protocols."
  },
  {
    icon: TrendingUp,
    title: "Dynamic Exit",
    description: "Sells based on profit targets or reversals."
  },
  {
    icon: ShieldCheck,
    title: "Secure Settlement",
    description: "Funds secured in your non-custodial wallet."
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
