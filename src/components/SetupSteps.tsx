
import React from "react";
import { motion } from "framer-motion";
import { PATHS } from "@/data/paths";
import { useTranslation } from "react-i18next";

interface SetupStepsProps {
  selectedPathId: string;
}

const SetupSteps: React.FC<SetupStepsProps> = ({ selectedPathId }) => {
  const path = PATHS.find(p => p.id === selectedPathId);
  const { t } = useTranslation();

  if (!path) return null;

  return (
    <motion.div
      key="steps"
      className="text-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-white mb-8">
        {t('setup_process_title')}
      </h2>
      <div className="flex justify-center items-center gap-8 mb-12">
        {path.steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3"
              style={{ 
                borderColor: path.color,
                backgroundColor: `${path.color}20`
              }}
            >
              <span className="text-2xl font-bold" style={{ color: path.color }}>
                {index + 1}
              </span>
            </div>
            <span className="text-white font-medium">{step}</span>
          </div>
        ))}
      </div>
      <button
        className="px-8 py-4 rounded-xl font-bold text-[#181711] text-lg transition-all duration-200 hover:scale-105"
        style={{ backgroundColor: path.color }}
      >
        {t('setup_proceed_button')}
      </button>
    </motion.div>
  );
};

export default SetupSteps;
