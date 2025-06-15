
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ArbitrageTicker from './ArbitrageTicker';
import ArbitrageVisual from './ArbitrageVisual';
import ArbitrageAlertCard from './ArbitrageAlertCard';

const DUMMY_ARBITRAGE_DATA = {
    pair: 'ETH/USDT',
    buyExchange: 'Kraken',
    sellExchange: 'Binance',
    buyPrice: '$3,005.10',
    sellPrice: '$3,012.65',
    profit: '$7.55',
    potential: '0.25%',
};

const CryptoArbitrageSection = () => {
    const [showAlert, setShowAlert] = useState(true);

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <motion.section 
            className="w-full max-w-6xl mx-auto flex flex-col items-center text-center mt-16 p-6 sm:p-12 relative bg-gray-950/20 border border-green/10 rounded-2xl bg-grid-pattern overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Explore Crypto Arbitrage <span className="text-gradient-green">With Ruyaa-Ai</span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl">
                Capitalize on market inefficiencies. Our arbitrage bot scans hundreds of pairs across multiple exchanges to find and execute profitable trades in milliseconds.
            </p>
            
            <ArbitrageTicker />

            <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 mt-8">
                <ArbitrageVisual />
                <ArbitrageAlertCard
                    show={showAlert}
                    onClose={handleCloseAlert}
                    data={DUMMY_ARBITRAGE_DATA}
                />
            </div>
        </motion.section>
    );
};

export default CryptoArbitrageSection;
