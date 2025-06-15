import React from 'react';
import { motion } from 'framer-motion';
import { Zap, DollarSign } from 'lucide-react';

const ExchangeNode = ({ name, position, isBuy = false }: { name: string, position: string, isBuy?: boolean }) => (
    <motion.div
        className={`absolute ${position}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <motion.div 
            className="w-32 h-32 rounded-full border border-green/30 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center shadow-lg shadow-green/20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-400">Exchange</p>
        </motion.div>
        <motion.div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 p-3 rounded-lg bg-gray-900/60 border border-gray-700/50 backdrop-blur-md ${isBuy ? '-mt-24' : 'mt-20'}`}
            initial={{ opacity: 0, y: isBuy ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        >
            <p className="text-sm font-semibold text-white">
                {isBuy ? 'BUY' : 'SELL'} <span className="font-light text-gray-300">1.5 ETH</span>
            </p>
            <p className="text-lg font-bold text-green">
                {isBuy ? '$3,005.10' : '$3,012.65'}
            </p>
        </motion.div>
    </motion.div>
);

const ArbitrageVisual = () => {
    const path = "M 80 250 Q 250 100 420 250";
    const reversePath = "M 420 250 Q 250 400 80 250";

    return (
        <div className="w-full max-w-xl aspect-square relative bg-gray-950/20 border border-green/10 rounded-2xl p-4 sm:p-8 overflow-hidden bg-grid-pattern">
            <div className="w-full h-full relative">
                {/* Exchanges */}
                <ExchangeNode name="Kraken" position="left-0 top-1/2 -translate-y-1/2" isBuy />
                <ExchangeNode name="Binance" position="right-0 top-1/2 -translate-y-1/2" />

                {/* Central AI Core */}
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-36 h-36 rounded-full bg-green/10 flex items-center justify-center animate-pulse-subtle">
                        <div className="w-28 h-28 rounded-full bg-green/20 flex items-center justify-center shadow-inner-green">
                            <Zap className="text-green h-12 w-12" />
                        </div>
                    </div>
                    <p className="text-center mt-4 text-gray-300 font-semibold">AI Arbitrage Core</p>
                </motion.div>

                {/* SVG for paths and animation */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
                    <defs>
                        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#16C784" stopOpacity="0" />
                            <stop offset="50%" stopColor="#16C784" stopOpacity="1" />
                            <stop offset="100%" stopColor="#16C784" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Buy Path */}
                    <path d={path} fill="none" stroke="#16C784" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="5 5" />
                    {/* Sell Path */}
                    <path d={reversePath} fill="none" stroke="#16C784" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="5 5" />
                    
                    {/* Animated Flow - Buy */}
                    <motion.g>
                        <motion.path
                            d={path}
                            fill="none"
                            stroke="url(#flow-gradient)"
                            strokeWidth="3"
                            initial={{ pathLength: 0, pathOffset: 1 }}
                            animate={{ pathLength: 1, pathOffset: 0 }}
                            transition={{ duration: 3, ease: 'linear', repeat: Infinity, delay: 1 }}
                        />
                    </motion.g>

                    {/* Animated Flow - Sell */}
                    <motion.g>
                        <motion.path
                            d={reversePath}
                            fill="none"
                            stroke="url(#flow-gradient)"
                            strokeWidth="3"
                            initial={{ pathLength: 0, pathOffset: 1 }}
                            animate={{ pathLength: 1, pathOffset: 0 }}
                            transition={{ duration: 3, ease: 'linear', repeat: Infinity, delay: 1 }}
                        />
                    </motion.g>
                </svg>

                {/* Profit Node */}
                <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 p-3 rounded-lg bg-green/10 border border-green/20 backdrop-blur-md shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2 }}
                >
                    <div className="w-10 h-10 rounded-full bg-green/20 flex items-center justify-center">
                        <DollarSign className="text-green h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-300">Net Profit</p>
                        <p className="text-lg font-bold text-green">$7.55</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ArbitrageVisual;
