
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArbitrageTicker from './ArbitrageTicker';
import ArbitrageVisual from './ArbitrageVisual';
import TradeNotification from './TradeNotification';

const CryptoArbitrageSection = () => {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => {
            setShowNotification(true);
        }, 5000);

        const hideTimer = setTimeout(() => {
            setShowNotification(false);
        }, 10000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <motion.section 
            className="w-full max-w-6xl mx-auto flex flex-col items-center text-center px-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Explore Crypto Arbitrage
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl">
                Capitalize on market inefficiencies. Our arbitrage bot scans hundreds of pairs across multiple exchanges to find and execute profitable trades in milliseconds.
            </p>
            
            <ArbitrageTicker />

            <ArbitrageVisual />
            
            <TradeNotification show={showNotification} profit="$7.55" />
        </motion.section>
    );
};

export default CryptoArbitrageSection;
