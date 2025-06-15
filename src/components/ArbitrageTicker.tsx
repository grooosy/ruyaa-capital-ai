
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TickerItem {
  pair: string;
  price: number;
  change: number;
}

const DUMMY_DATA: TickerItem[] = [
  { pair: 'BTC/ETH', price: 16.12, change: 0.05 },
  { pair: 'ETH/USDT', price: 2654.29, change: -1.62 },
  { pair: 'SOL/USDT', price: 137.87, change: 1.93 },
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
    <div className="flex items-center gap-4 min-w-[160px] px-4 py-1 text-base">
      {/* Pair */}
      <span className="font-medium text-gray-200">{item.pair}</span>
      {/* Price */}
      <span className="font-semibold text-white">
        {item.price.toLocaleString(undefined, {
          maximumFractionDigits: item.pair.includes('BTC') || item.pair.includes('ETH') ? 5 : 2,
          minimumFractionDigits: item.price < 1 ? 5 : 2,
        })}
      </span>
      {/* Change */}
      <span className={`flex items-center font-bold ${isPositive ? 'text-green' : 'text-red-400'}`}>
        {isPositive ? (
          <ArrowUp size={14} strokeWidth={2.5} className="mr-1" />
        ) : (
          <ArrowDown size={14} strokeWidth={2.5} className="mr-1" />
        )}
        {isPositive ? '+' : ''}{item.change.toFixed(2)}%
      </span>
    </div>
  );
};

const ArbitrageTicker: React.FC = () => {
  const [data, setData] = React.useState(DUMMY_DATA);

  // Animate prices (demo effect)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => prevData.map(item => ({
        ...item,
        price: Number((item.price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(6)),
        change: Number((item.change + (Math.random() - 0.5) * 0.08).toFixed(2)),
      })));
    }, 2200); // slower for smoothness
    return () => clearInterval(interval);
  }, []);

  // Duplicate data for seamless marquee loop
  const looped = [...data, ...data];

  return (
    <div
      className="relative w-full h-14 bg-black/70 border border-green/30 rounded-lg overflow-hidden shadow-inner-green"
      style={{ minHeight: 56 }}
    >
      {/* Gradient edges for modern look */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#181a20] via-[#181a20a0] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#181a20] via-[#181a20a0] to-transparent z-10" />

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      {/* Main ticker content, horizontally scrolling */}
      <div
        className="flex items-center h-full animate-[marquee_30s_linear_infinite] gap-5"
        style={{
          width: 'max-content',
          minWidth: '100%',
        }}
      >
        {looped.map((item, idx) => (
          <TickerItemComponent key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ArbitrageTicker;
