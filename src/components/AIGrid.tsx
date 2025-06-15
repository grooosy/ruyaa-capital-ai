
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

const AGENTS = [
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

const ORBIT_RADIUS = 200;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.7, filter: "blur(8px)" },
  visible: (custom: { x: number; y: number; i: number }) => ({
    x: custom.x,
    y: custom.y,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.2 + custom.i * 0.1,
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  }),
  exit: { 
    opacity: 0, 
    scale: 0.7, 
    x: 0, 
    y: 0, 
    transition: { duration: 0.2 } 
  },
};

const AIGrid: React.FC = () => {
  const [active, setActive] = React.useState(false);

  return (
    <section className="w-full max-w-6xl mx-auto py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          AI-Powered Trading Ecosystem
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Six intelligent agents working together to optimize your trading experience
        </p>
      </div>

      <div className="relative w-[500px] h-[500px] mx-auto flex items-center justify-center">
        {/* Central AI Core */}
        <motion.button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none focus:ring-2 focus:ring-gold rounded-full"
          style={{ zIndex: 30 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActive(!active)}
          aria-label="Toggle AI Agents"
        >
          {/* Outer glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ filter: "blur(30px)" }}
            animate={active ? { 
              opacity: 0.6, 
              scale: 1.2,
              background: "radial-gradient(circle, #16C78440 0%, #E6C41920 50%, transparent 100%)"
            } : { 
              opacity: 0.3, 
              scale: 1,
              background: "radial-gradient(circle, #16C78420 0%, transparent 70%)"
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Main core */}
          <motion.div
            className="relative w-48 h-48 rounded-full flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #16C784 0%, #E6C419 100%)",
              boxShadow: active 
                ? "0 0 60px #16C78450, 0 0 30px #E6C41930" 
                : "0 0 30px #16C78430"
            }}
            animate={active ? { scale: 1.1 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Animated rings */}
            {active && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="w-full h-full" viewBox="0 0 192 192">
                  <circle
                    cx="96"
                    cy="96"
                    r="85"
                    stroke="#16C784"
                    strokeWidth="2"
                    strokeDasharray="10,5"
                    fill="none"
                    opacity="0.6"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 96 96"
                      to="360 96 96"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="96"
                    cy="96"
                    r="75"
                    stroke="#E6C419"
                    strokeWidth="1.5"
                    strokeDasharray="5,8"
                    fill="none"
                    opacity="0.4"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="360 96 96"
                      to="0 96 96"
                      dur="12s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </motion.div>
            )}

            <span className="text-4xl font-bold text-[#181711] relative z-10 tracking-wide">
              AI CORE
            </span>
            <span className="text-[#181711] text-sm opacity-80 relative z-10">
              Neural Engine
            </span>
          </motion.div>

          {!active && (
            <motion.div
              className="absolute left-1/2 top-[115%] -translate-x-1/2 text-green text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Click to activate
            </motion.div>
          )}
        </motion.button>

        {/* Orbiting agent cards */}
        <AnimatePresence>
          {active &&
            AGENTS.map((agent, i) => {
              const rad = (agent.angle * Math.PI) / 180;
              const x = Math.cos(rad) * ORBIT_RADIUS;
              const y = Math.sin(rad) * ORBIT_RADIUS * 0.8;
              
              return (
                <motion.div
                  key={agent.label}
                  className="absolute w-56 h-36 rounded-2xl p-4 border cursor-pointer"
                  style={{
                    left: "50%",
                    top: "50%",
                    backgroundColor: "#1a1915",
                    borderColor: `${agent.color}40`,
                    boxShadow: `0 4px 20px ${agent.color}20`,
                  }}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={{ x, y, i }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 8px 30px ${agent.color}30`,
                    borderColor: `${agent.color}60`
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${agent.color}20` }}
                    >
                      <agent.icon size={22} color={agent.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm mb-1">
                        {agent.label}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {agent.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIGrid;
