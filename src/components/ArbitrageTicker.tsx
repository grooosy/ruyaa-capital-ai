
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TickerItem {
  pair: string;
  price: number;
  change: number;
}

const PAIRS = [
  { pair: 'BTC/ETH', symbol: 'BTCETH' },
  { pair: 'ETH/USDT', symbol: 'ETHUSDT' },
  { pair: 'SOL/USDT', symbol: 'SOLUSDT' },
  { pair: 'XRP/BTC', symbol: 'XRPBTC' },
  { pair: 'ADA/ETH', symbol: 'ADAETH' },
  { pair: 'LINK/USDT', symbol: 'LINKUSDT' },
  { pair: 'DOGE/USDT', symbol: 'DOGEUSDT' },
  { pair: 'MATIC/BTC', symbol: 'MATICBTC' },
  { pair: 'BNB/USDT', symbol: 'BNBUSDT' },
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
  const [data, setData] = React.useState<TickerItem[]>([]);
  const [prev, setPrev] = React.useState<Record<string, number>>({});

  const fetchPrices = async () => {
    const results = await Promise.all(
      PAIRS.map(async ({ pair, symbol }) => {
        try {
          const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
          const json = await res.json();
          const price = parseFloat(json.price);
          const p = prev[symbol] ?? price;
          const change = ((price - p) / p) * 100;
          return { pair, price, change } as TickerItem;
        } catch {
          const fallback = prev[symbol] ?? 0;
          return { pair, price: fallback, change: 0 } as TickerItem;
        }
      })
    );
    const newPrev: Record<string, number> = {};
    results.forEach((r, idx) => {
      newPrev[PAIRS[idx].symbol] = r.price;
    });
    setPrev(newPrev);
    setData(results);
  };

  React.useEffect(() => {
    fetchPrices();
    const id = setInterval(fetchPrices, 15000);
    return () => clearInterval(id);
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
