
import React from "react";
import { motion } from "framer-motion";
import { Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
  index: number;
  orbitRadius: number;
}

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
      type: "spring" as const,
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

const AgentCard: React.FC<AgentCardProps> = ({ agent, index, orbitRadius }) => {
  const rad = (agent.angle * Math.PI) / 180;
  const x = Math.cos(rad) * orbitRadius;
  const y = Math.sin(rad) * orbitRadius * 0.8;

  return (
    <motion.div
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
      custom={{ x, y, i: index }}
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
};

export default AgentCard;
