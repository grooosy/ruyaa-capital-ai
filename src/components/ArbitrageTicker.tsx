
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TickerItem {
  pair: string;
  price: number;
  change: number;
}

const DUMMY_DATA: TickerItem[] = [
  { pair: 'BTC/ETH', price: 16.12, change: 0.05 },
  { pair: 'ETH/USDT', price: 2680.45, change: -1.66 },
  { pair: 'SOL/USDT', price: 135.80, change: 2.13 },
  { pair: 'XRP/BTC', price: 0.0000121, change: -0.54 },
  { pair: 'ADA/ETH', price: 0.00017, change: 1.25 },
  { pair: 'LINK/USDT', price: 18.50, change: 3.01 },
  { pair: 'DOGE/USDT', price: 0.158, change: -0.89 },
  { pair: 'MATIC/BTC', price: 0.000025, change: 0.98 },
  { pair: 'BNB/USDT', price: 589.4, change: -0.21 },
];

const TickerItemComponent: React.FC<{ item: TickerItem }> = ({ item }) => {
  const isPositive = item.change >= 0;
  return (
    <div className="flex items-center gap-4 px-6 shrink-0">
      <span className="text-sm font-medium text-gray-300">{item.pair}</span>
      <span className="text-sm font-bold text-white">{item.price.toFixed(item.pair.includes('BTC') || item.pair.includes('ETH') ? 5 : 2)}</span>
      <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-green' : 'text-red-400'}`}>
        {isPositive ? <ArrowUp size={14} strokeWidth={2.5}/> : <ArrowDown size={14} strokeWidth={2.5}/>}
        <span>{isPositive ? '+' : ''}{item.change.toFixed(2)}%</span>
      </div>
    </div>
  );
};

const ArbitrageTicker: React.FC = () => {
    const [data, setData] = React.useState(DUMMY_DATA);
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => prevData.map(item => ({
                ...item,
                price: item.price * (1 + (Math.random() - 0.5) * 0.005),
                change: item.change + (Math.random() - 0.5) * 0.1,
            })));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

  const duplicatedData = [...data, ...data, ...data, ...data]; // Duplicate for seamless animation

  return (
    <div className="relative w-full max-w-full mx-auto h-14 bg-black/30 border-y border-green/20 overflow-hidden backdrop-blur-sm group mb-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-bg to-transparent z-10" />

      <div className="flex items-center h-full animate-marquee [animation-play-state:running] group-hover:[animation-play-state:paused]">
        {duplicatedData.map((item, index) => (
          <TickerItemComponent key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ArbitrageTicker;
