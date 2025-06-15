
import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  MessageSquare,
  LineChart,
  GraduationCap,
  ScanSearch,
  Activity,
} from "lucide-react";

// Each card is positioned on a ring at a certain angle
const AGENTS = [
  {
    icon: ShieldCheck,
    label: "Security & Risk",
    desc: "Institutional-grade risk controls and trade safety.",
    angle: 0,
    color: "#16C784",
  },
  {
    icon: MessageSquare,
    label: "Signals & Alerts",
    desc: "24/7 actionable trade signals, real-time alerts.",
    angle: 60,
    color: "#E6C419",
  },
  {
    icon: LineChart,
    label: "Stats Engine",
    desc: "Live analytics, PnL, strategies & edge.",
    angle: 120,
    color: "#627EEA",
  },
  {
    icon: GraduationCap,
    label: "Autolearn",
    desc: "Self-improving AI adapts to all markets.",
    angle: 180,
    color: "#16C784",
  },
  {
    icon: ScanSearch,
    label: "Smart Scanner",
    desc: "AI search over 150+ assets, instant analysis.",
    angle: 240,
    color: "#E6C419",
  },
  {
    icon: Activity,
    label: "Execution Bot",
    desc: "Zero-lag fills, rapid execution always on.",
    angle: 300,
    color: "#F7931A",
  },
];

const ORBIT_RADIUS = 180; // px

const AIGrid: React.FC = () => {
  return (
    <div className="relative w-[480px] h-[400px] mx-auto flex items-center justify-center">
      {/* Central AI Core */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-green shadow-green-glow border-4 border-[#23221c] text-[#181711] flex flex-col items-center justify-center rounded-full"
        style={{ width: 160, height: 160, zIndex: 10 }}
      >
        <span className="text-3xl font-bold tracking-wide text-[#181711]">AI CORE</span>
      </div>
      {/* Agent cards */}
      {AGENTS.map((agent, i) => {
        const rad = (agent.angle * Math.PI) / 180;
        const x = Math.cos(rad) * ORBIT_RADIUS;
        const y = Math.sin(rad) * ORBIT_RADIUS * 0.85; // oval for visual
        return (
          <motion.div
            key={agent.label}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.22 + 0.06 * i, type: "spring", stiffness: 120 } }}
            className="absolute w-64 h-40 bg-[#1d1c17] rounded-2xl shadow-lg shadow-green/30 flex flex-col items-center justify-center p-4 border border-green"
            style={{
              left: `calc(50% + ${x}px - 128px)`,
              top: `calc(50% + ${y}px - 80px)`,
              zIndex: 2,
              transform: `rotate(${agent.angle}deg)`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <agent.icon size={26} color={agent.color} />
              <span className="font-semibold text-lg text-white">{agent.label}</span>
            </div>
            <div className="text-sm text-gray-300 text-center opacity-80">
              {agent.desc}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AIGrid;
