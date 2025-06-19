import React from "react";
import { motion } from "framer-motion";

interface AICoreProps {
  active: boolean;
  onClick: () => void;
}

const AICore: React.FC<AICoreProps> = ({ active, onClick }) => {
  return (
    <motion.button
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none focus:ring-2 focus:ring-gold rounded-full"
      style={{ zIndex: 30 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
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
  );
};

export default AICore;
