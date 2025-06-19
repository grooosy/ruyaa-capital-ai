import {
  BrainCog,
  Bot,
  Cpu,
  GraduationCap,
  BrainCircuit,
  Activity,
} from "lucide-react";
import { Agent } from "@/types/agent";

export const AGENTS: Agent[] = [
  {
    icon: BrainCog,
    label: "Verified Broker",
    desc: "Institutional-grade security and compliance.",
    angle: 0,
    color: "#00A86B",
  },
  {
    icon: Bot,
    label: "Live AI Chat",
    desc: "24/7 intelligent trading assistance.",
    angle: 60,
    color: "#FFD700",
  },
  {
    icon: Cpu,
    label: "Portfolio Insights",
    desc: "Real-time analytics and performance tracking.",
    angle: 120,
    color: "#FFD700",
  },
  {
    icon: BrainCircuit,
    label: "Trading Academy",
    desc: "AI-powered learning and strategy optimization.",
    angle: 180,
    color: "#FFD700",
  },
  {
    icon: Bot,
    label: "Crypto Arbitrage",
    desc: "Automated opportunity detection and execution.",
    angle: 240,
    color: "#00A86B",
  },
  {
    icon: Activity,
    label: "Live Market Ticker",
    desc: "Real-time market data and price feeds.",
    angle: 300,
    color: "#FFD700",
  },
];

export const ORBIT_RADIUS = 200;
