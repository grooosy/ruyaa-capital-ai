
import React from 'react';
import { motion } from 'framer-motion';
import ArbitrageTicker from './ArbitrageTicker';
import ProcessTimeline from './ProcessTimeline';
import { cryptoArbitrageTimeline } from '@/data/agentFlows';

const CryptoArbitrageSection = () => {
    return (
        <motion.section 
            className="w-full max-w-6xl mx-auto flex flex-col items-center text-center px-6 mt-24"
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

            <h3 className="text-2xl font-semibold text-white mt-16 mb-8">
                The Arbitrage Process, Step-by-Step
            </h3>

            <ProcessTimeline timeline={cryptoArbitrageTimeline} theme="gold" />
        </motion.section>
    );
};

export default CryptoArbitrageSection;
