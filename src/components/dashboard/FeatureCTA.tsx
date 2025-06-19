
import React from "react";
import { motion } from "framer-motion";
import { Bolt } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureCTAProps {
  onActivate: () => void;
}
const FeatureCTA: React.FC<FeatureCTAProps> = ({ onActivate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      className="relative bg-[#1A1A1A] backdrop-blur-sm rounded-xl p-6 overflow-hidden flex flex-col items-center text-center shadow-md focus-within:ring-2 focus-within:ring-green-400 outline-none"
      tabIndex={0}
      aria-label="Activate features"
    >
      <div className="absolute inset-0 bg-black/40 blur-xl -z-10" aria-hidden />
      <span className="flex mb-3">
        <Bolt className="w-7 h-7 text-green-400" strokeWidth={2.2} />
      </span>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Unlock &amp; Start Profiting</h3>
      <Button
        onClick={onActivate}
        className="px-8 py-3 rounded-full border-2 border-green-400 text-green-200 bg-green-800/20 hover:bg-green-600/30 focus-visible:ring-2 focus-visible:ring-green-400 font-semibold text-base transition-all"
        tabIndex={0}
      >
        Activate Features
      </Button>
    </motion.div>
  );
};
export default FeatureCTA;
