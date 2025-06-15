
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
          className="w-full max-w-sm"
        >
          <Card className="bg-gradient-to-b from-[#16181a] via-[#191B17] to-[#19191B] border border-[#23261b]/60 shadow-neon-bright shadow-lg text-white h-full flex flex-col !rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-yellow-200">
                <Zap className="text-green h-5 w-5" />
                <span>New Arbitrage Opportunity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-0 flex-grow">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-neutral-100">{data.pair}</span>
                <div className="text-right">
                  <p className="text-sm text-neutral-400">Potential Profit</p>
                  <p className="text-lg font-bold text-green">{data.potential}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 p-3 rounded-md bg-[#181a14] border border-[#22251d]/70">
                <div className="text-center">
                  <p className="text-xs text-[#C9C6A6]">BUY ON</p>
                  {/* Now: Kraken appears green, Binance yellow below */}
                  {data.buyExchange === 'Kraken' ? (
                    <>
                      <p className="font-semibold text-[#00FF9D]">Kraken</p>
                      <p className="font-bold text-lg text-neutral-100">{data.buyPrice}</p>
                    </>
                  ) : data.buyExchange === 'Binance' ? (
                    <>
                      <p className="font-semibold text-[#EED584]">Binance</p>
                      <p className="font-bold text-lg text-neutral-100">{data.buyPrice}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-neutral-200">{data.buyExchange}</p>
                      <p className="font-bold text-lg text-neutral-100">{data.buyPrice}</p>
                    </>
                  )}
                </div>
                <ArrowRight className="text-gray-500 shrink-0" />
                <div className="text-center">
                  <p className="text-xs text-[#C9C6A6]">SELL ON</p>
                  {/* Now: Binance appears yellow, Kraken green below */}
                  {data.sellExchange === 'Binance' ? (
                    <>
                      <p className="font-semibold text-[#EED584]">Binance</p>
                      <p className="font-bold text-lg text-neutral-100">{data.sellPrice}</p>
                    </>
                  ) : data.sellExchange === 'Kraken' ? (
                    <>
                      <p className="font-semibold text-[#00FF9D]">Kraken</p>
                      <p className="font-bold text-lg text-neutral-100">{data.sellPrice}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-neutral-200">{data.sellExchange}</p>
                      <p className="font-bold text-lg text-neutral-100">{data.sellPrice}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <DollarSign className="w-4 h-4 text-green"/>
                <span>Net profit after fees: <span className="font-bold text-green">{data.profit}</span></span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10">Dismiss</Button>
              <Button className="bg-gradient-to-r from-[#00FF9D] to-[#EED584] text-black font-bold hover:from-green-400 hover:to-gold/90 transition-all">
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
