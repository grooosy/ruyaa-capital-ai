
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const LiveMarketTicker: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'BTC/USD', price: 43250.75, change: 1250.30, changePercent: 2.98 },
    { symbol: 'ETH/USD', price: 2680.45, change: -45.20, changePercent: -1.66 },
    { symbol: 'EUR/USD', price: 1.0875, change: 0.0032, changePercent: 0.30 },
    { symbol: 'GBP/USD', price: 1.2745, change: -0.0018, changePercent: -0.14 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * (item.price * 0.001),
        change: (Math.random() - 0.5) * (item.price * 0.002),
        changePercent: (Math.random() - 0.5) * 3
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0f0f0f] border border-green/20 rounded-xl p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
          <span className="text-green text-sm font-semibold">LIVE MARKETS</span>
        </div>
        <span className="text-xs text-gray-400">Real-time data</span>
      </div>
      
      <div className="flex gap-6 mt-3 overflow-x-auto scrollbar-hide">
        {marketData.map((item, index) => (
          <div key={index} className="flex items-center gap-3 min-w-fit">
            <span className="text-white font-medium text-sm">{item.symbol}</span>
            <span className="text-gold font-bold">${item.price.toFixed(item.symbol.includes('USD') && !item.symbol.includes('BTC') && !item.symbol.includes('ETH') ? 4 : 2)}</span>
            <div className={`flex items-center gap-1 ${item.changePercent >= 0 ? 'text-green' : 'text-red-400'}`}>
              {item.changePercent >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span className="text-xs font-medium">{item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarketTicker;
