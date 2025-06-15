import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ArbitrageTicker from './ArbitrageTicker';
import ArbitrageVisual from './ArbitrageVisual';
import ArbitrageAlertCard from './ArbitrageAlertCard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
    const { t } = useTranslation();

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
                {t('arbitrage_title')} <span className="text-gradient-green">{t('arbitrage_subtitle')}</span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl">
                {t('arbitrage_desc')}
            </p>
            
            <ArbitrageTicker />

            <div className="w-full flex flex-col lg:flex-row lg:rtl:flex-row-reverse items-center lg:items-start justify-center gap-8 mt-8">
                <ArbitrageVisual />
                <ArbitrageAlertCard
                    show={showAlert}
                    onClose={handleCloseAlert}
                    data={DUMMY_ARBITRAGE_DATA}
                />
            </div>
            
            <motion.div
                className="mt-12"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
              <Link
                  to="/agents/arbitrage"
                  className="bg-green text-dark-charcoal px-8 py-4 rounded-xl text-lg font-bold shadow-green-glow hover:bg-green/90 transition-all duration-300 tracking-wide inline-flex items-center gap-2"
              >
                  {t('try_now_arbitrage')}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
            </motion.div>
        </motion.section>
    );
};

export default CryptoArbitrageSection;
