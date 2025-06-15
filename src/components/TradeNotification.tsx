
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface TradeNotificationProps {
  show: boolean;
  profit: string;
}

const TradeNotification: React.FC<TradeNotificationProps> = ({ show, profit }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-4 p-4 rounded-xl bg-gray-900/80 backdrop-blur-md border border-green/30 shadow-lg shadow-green/20"
        >
          <div className="flex-shrink-0">
            <CheckCircle className="h-8 w-8 text-green" />
          </div>
          <div>
            <p className="font-bold text-white">Arbitrage Trade Executed</p>
            <p className="text-sm text-gray-300">
              Successfully captured a profit of <span className="font-bold text-green">{profit}</span>.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TradeNotification;
