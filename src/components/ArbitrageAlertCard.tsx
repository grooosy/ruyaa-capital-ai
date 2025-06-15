
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight, DollarSign } from 'lucide-react';

interface ArbitrageAlertCardProps {
  show: boolean;
  onClose: () => void;
  data: {
    pair: string;
    buyExchange: string;
    sellExchange: string;
    buyPrice: string;
    sellPrice: string;
    profit: string;
    potential: string;
  };
}

const ArbitrageAlertCard: React.FC<ArbitrageAlertCardProps> = ({ show, onClose, data }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } }}
          className="fixed bottom-5 right-5 z-50 w-full max-w-sm"
        >
          <Card className="bg-gray-900/80 backdrop-blur-md border-green/30 shadow-lg shadow-green/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="text-green h-5 w-5" />
                <span>New Arbitrage Opportunity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-0">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{data.pair}</span>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Potential Profit</p>
                  <p className="text-lg font-bold text-green">{data.potential}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 p-3 rounded-md bg-black/30">
                <div className="text-center">
                  <p className="text-xs text-gray-400">BUY ON</p>
                  <p className="font-semibold">{data.buyExchange}</p>
                  <p className="font-bold text-lg">{data.buyPrice}</p>
                </div>
                <ArrowRight className="text-gray-500 shrink-0" />
                <div className="text-center">
                  <p className="text-xs text-gray-400">SELL ON</p>
                  <p className="font-semibold">{data.sellExchange}</p>
                  <p className="font-bold text-lg">{data.sellPrice}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-green"/>
                <span>Net profit after fees: <span className="font-bold text-green">{data.profit}</span></span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10">Dismiss</Button>
              <Button className="bg-green text-black hover:bg-green/90">
                <Zap className="mr-2 h-4 w-4" /> Execute
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArbitrageAlertCard;
