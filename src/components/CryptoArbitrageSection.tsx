
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ArbitrageTicker from './ArbitrageTicker';
import ArbitrageVisual from './ArbitrageVisual';
import ArbitrageAlertCard from './ArbitrageAlertCard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useMarketData } from '@/hooks/useMarketData'; // For real-time price

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

    const { btc, gold } = useMarketData();

    const btcPrice = btc?.data?.price ? `$${btc.data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '...';
    const btcChange = btc?.data?.change;
    const btcChangeFormatted = btcChange !== undefined ? `${btcChange >= 0 ? '+' : ''}${btcChange.toFixed(2)}%` : '';

    const goldPrice = gold?.data?.price ? `$${gold.data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '...';
    const goldChange = gold?.data?.change;
    const goldChangeFormatted = goldChange !== undefined ? `${goldChange >= 0 ? '+' : ''}${goldChange.toFixed(2)}%` : '';

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <motion.section 
            className="
                w-full max-w-6xl mx-auto flex flex-col items-center text-center 
                mt-20 px-4 sm:px-10 py-12 relative rounded-2xl 
                bg-[#17171A] border border-[#222221]/60 shadow-neon
                transition-all duration-300
            "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-2 text-white tracking-tight">
                {t('arbitrage_title')}{' '}
                <span className="text-neutral-200 font-black">{t('arbitrage_subtitle')}</span>
            </h2>

            {/* Extended, real-time price line */}
            <div className="w-full flex justify-center items-center mt-2 mb-8">
                <div className="w-full max-w-2xl bg-[#191A1D] py-2 sm:py-3 px-4 rounded-lg border border-[#222221]/40 shadow-inner-green flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/public/logos/btc-official.svg" alt="BTC" className="w-5 h-5" />
                        <span className="text-base sm:text-lg font-semibold text-white">BTC</span>
                        <span className="font-bold text-green">{btcPrice}</span>
                        <span className={`ml-2 text-xs font-semibold ${btcChange !== undefined ? (btcChange >= 0 ? 'text-green' : 'text-red-400') : 'text-neutral-400'}`}>
                            {btcChangeFormatted}
                        </span>
                    </div>
                    <span className="hidden sm:block h-5 w-[2px] bg-[#232332] rounded mx-4" />
                    <div className="flex items-center gap-2">
                        <img src="/public/logos/gold-bars.svg" alt="Gold" className="w-5 h-5" />
                        <span className="text-base sm:text-lg font-semibold text-white">Gold</span>
                        <span className="font-bold text-yellow-300">{goldPrice}</span>
                        <span className={`ml-2 text-xs font-semibold ${goldChange !== undefined ? (goldChange >= 0 ? 'text-green' : 'text-red-400') : 'text-neutral-400'}`}>
                            {goldChangeFormatted}
                        </span>
                    </div>
                    {/* Decorative line extends background visually underneath... */}
                </div>
            </div>

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
                    className="bg-[#191A1D] text-neutral-50 px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#24252a] border border-[#00FF9D]/40 transition-all duration-300 tracking-wide inline-flex items-center gap-2"
                >
                    {t('try_now_arbitrage')}
                    <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
            </motion.div>
        </motion.section>
    );
};

export default CryptoArbitrageSection;
