
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
            className="w-full max-w-6xl mx-auto flex flex-col items-center text-center mt-20 px-4 sm:px-10 py-12 relative rounded-2xl bg-gradient-to-tr from-black/85 via-[#21221b] to-[#161612] border border-green-400/10 shadow-neon"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#CFA100] to-[#00FF9D] bg-clip-text text-transparent">
                {t('arbitrage_title')} <span className="text-[#CFA100]">{t('arbitrage_subtitle')}</span>
            </h2>
            <p className="text-lg text-neutral-300 mb-10 max-w-3xl mx-auto">
                {t('arbitrage_desc')}
            </p>
            
            <div className="w-full max-w-2xl mx-auto mb-8">
                <ArbitrageTicker />
            </div>

            <div className="w-full flex flex-col md:flex-row md:rtl:flex-row-reverse items-center justify-center gap-6 mt-1">
                <div className="flex-1 flex min-w-[280px] justify-center">
                    <ArbitrageVisual />
                </div>
                <div className="flex-1 flex min-w-[280px] justify-center">
                    <ArbitrageAlertCard
                        show={showAlert}
                        onClose={handleCloseAlert}
                        data={DUMMY_ARBITRAGE_DATA}
                    />
                </div>
            </div>
            
            <motion.div
                className="mt-10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
            >
              <Link
                  to="/agents/arbitrage"
                  className="bg-gradient-to-r from-[#00FF9D] to-[#23221c] text-[#181711] px-8 py-4 rounded-xl text-lg font-bold shadow-green-glow hover:from-green-300 hover:to-[#23221c]/80 transition-all duration-300 tracking-wide inline-flex items-center gap-2 border-2 border-[#00FF9D] shadow-[0_0_22px_#00FF9D44]"
              >
                  {t('try_now_arbitrage')}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
            </motion.div>
        </motion.section>
    );
};

export default CryptoArbitrageSection;
