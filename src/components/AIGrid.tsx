
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const cardPopVariants = {
  hidden: { opacity: 0, scale: 0.7, x: 0, y: 0, filter: "blur(8px)" },
  visible: (orbit: { x: number; y: number; i: number }) => ({
    x: orbit.x,
    y: orbit.y,
    opacity: 1,
    scale: 1.05,
    filter: "blur(0)",
    transition: {
      delay: 0.16 + orbit.i * 0.08,
      // type: "spring",
      stiffness: 110,
      damping: 13,
    },
  }),
  exit: { opacity: 0, scale: 0.77, x: 0, y: 0, transition: { duration: 0.18 } },
};

const AIGrid: React.FC = () => {
  const [active, setActive] = React.useState(false);

  return (
    <div className="relative w-[480px] h-[400px] mx-auto flex items-center justify-center z-10 select-none">
      {/* Central AI Core with pop/halo effect */}
      <motion.button
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none focus:ring-2 focus:ring-gold"
        style={{
          WebkitTapHighlightColor: "transparent",
          zIndex: 30,
        }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setActive((v) => !v)}
        aria-label="Toggle AI Core"
      >
        {/* Glow/Halo */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ filter: "blur(22px)", width: 230, height: 230, zIndex: 0 }}
        >
          <motion.div
            animate={active ? { opacity: 0.58, scale: 1.12 } : { opacity: 0.22, scale: 0.95 }}
            className="rounded-full bg-green/30 w-full h-full"
            transition={{ duration: 0.39 }}
          />
        </div>
        {/* Main AI CORE */}
        <motion.div
          className="relative rounded-full border-4 border-[#23221c] bg-gradient-to-br from-green to-gold text-[#181711] flex flex-col items-center justify-center shadow-[0_0_40px_0_rgba(22,199,132,0.29)]"
          style={{ width: 170, height: 170 }}
          animate={active ? { scale: 1.1, boxShadow: "0 0 62px #16C78455" } : { scale: 1, boxShadow: "0 0 24px #16C78422" }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          {/* Animated center orb effect */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={active ? { opacity: 0.7, scale: 1.15 } : { opacity: 0.36, scale: 1 }}
            style={{
              background: "radial-gradient(ellipse at 60% 40%, #16C78444 70%, transparent 100%)",
            }}
            transition={{ duration: 0.52 }}
          />
          <span
            className="text-3xl md:text-4xl font-bold tracking-wide text-[#181711] relative z-10"
            style={{
              letterSpacing: ".07em",
              textShadow: active
                ? "0 4px 32px #16c784aa, 0 2px 18px #e6c41966"
                : "0 2px 14px #16c78455",
            }}
          >
            AI CORE
          </span>
          {/* Futuristic animated lines/arcs */}
          {active && (
            <motion.div
              className="absolute z-30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.06 }}
              exit={{ opacity: 0, scale: 0.77 }}
              transition={{ duration: 0.31 }}
            >
              <svg width="170" height="170" viewBox="0 0 170 170" fill="none">
                <circle
                  cx="85"
                  cy="85"
                  r="81"
                  stroke="#16C784"
                  strokeWidth="2"
                  strokeDasharray="15,14"
                  opacity="0.7"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 85 85"
                    to="360 85 85"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="85"
                  cy="85"
                  r="70"
                  stroke="#E6C419"
                  strokeWidth="2"
                  strokeDasharray="8,12"
                  opacity="0.43"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="360 85 85"
                    to="0 85 85"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </motion.div>
          )}
        </motion.div>
        {/* Prompt to click */}
        {!active && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.48, y: 0 }}
            className="absolute left-1/2 top-[102%] -translate-x-1/2 font-medium text-green text-base"
          >
            Tap / Click
          </motion.div>
        )}
      </motion.button>
      {/* POP OUT AGENT CARDS */}
      <AnimatePresence>
        {active &&
          AGENTS.map((agent, i) => {
            const rad = (agent.angle * Math.PI) / 180;
            const x = Math.cos(rad) * ORBIT_RADIUS;
            const y = Math.sin(rad) * ORBIT_RADIUS * 0.85; // oval for visual
            return (
              <motion.div
                key={agent.label}
                className="absolute w-64 h-40 bg-[#1d1c17] rounded-2xl shadow-lg shadow-green/30 flex flex-col items-center justify-center p-4 border border-green hover:scale-105 transition transform-gpu"
                variants={cardPopVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={{ x, y, i }}
                style={{
                  left: "50%",
                  top: "50%",
                  zIndex: 2,
                  originX: 0.5,
                  originY: 0.5,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <agent.icon size={26} color={agent.color} />
                  <span className="font-semibold text-lg text-white">{agent.label}</span>
                </div>
                <div className="text-sm text-gray-300 text-center opacity-80">{agent.desc}</div>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default AIGrid;
