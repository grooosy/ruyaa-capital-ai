
import React from 'react';
import { motion } from 'framer-motion';
import ArbitrageTicker from './ArbitrageTicker';
import ArbitrageVisual from './ArbitrageVisual';

const CryptoArbitrageSection = () => {
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

            <h3 className="text-3xl font-bold text-white mt-20 mb-4 text-center">
                See Our AI in Action
            </h3>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl text-center">
                Watch a real-time visualization of our AI identifying and executing a profitable arbitrage trade between exchanges.
            </p>

            <ArbitrageVisual />
        </motion.section>
    );
};

export default CryptoArbitrageSection;
