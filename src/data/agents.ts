import {
  ShieldCheck,
  MessageSquare,
  LineChart,
  GraduationCap,
  ScanSearch,
  Activity,
} from "lucide-react";
import { Agent } from "@/types/agent";

export const AGENTS: Agent[] = [
  {
    icon: ShieldCheck,
    label: "Verified Broker",
    desc: "Institutional-grade security and compliance.",
    angle: 0,
    color: "#16C784",
  },
  {
    icon: MessageSquare,
    label: "Live AI Chat",
    desc: "24/7 intelligent trading assistance.",
    angle: 60,
    color: "#E6C419",
  },
  {
    icon: LineChart,
    label: "Portfolio Insights",
    desc: "Real-time analytics and performance tracking.",
    angle: 120,
    color: "#627EEA",
  },
  {
    icon: GraduationCap,
    label: "Trading Academy",
    desc: "AI-powered learning and strategy optimization.",
    angle: 180,
    color: "#16C784",
  },
  {
    icon: ScanSearch,
    label: "Crypto Arbitrage",
    desc: "Automated opportunity detection and execution.",
    angle: 240,
    color: "#E6C419",
  },
  {
    icon: Activity,
    label: "Live Market Ticker",
    desc: "Real-time market data and price feeds.",
    angle: 300,
    color: "#F7931A",
  },
];

export const ORBIT_RADIUS = 200;
