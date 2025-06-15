
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface AgentSelectionCardProps {
  title: string;
  logo: string | LucideIcon;
  to: string;
  isSvgIcon?: boolean;
}

const AgentSelectionCard: React.FC<AgentSelectionCardProps> = ({ title, logo: Logo, to, isSvgIcon = false }) => {
  return (
    <Link to={to} className="block">
      <motion.div
        className="bg-[#1C1C22] border border-transparent rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center transition-colors duration-300"
        whileHover={{
          scale: 1.03,
          borderColor: "#E6C41940",
          boxShadow: "0 10px 30px -10px #E6C41920",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isSvgIcon ? (
          <Logo className="h-20 w-20 text-gold mb-6" strokeWidth={1.5} />
        ) : (
          <img src={Logo as string} alt={`${title} logo`} className="h-20 w-auto mb-6 object-contain" />
        )}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </motion.div>
    </Link>
  );
};

export default AgentSelectionCard;
