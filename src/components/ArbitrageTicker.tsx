
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TickerItem {
  pair: string;
  price: number;
  change: number;
}

// Mapping of crypto pairs using CoinGecko coin IDs
const PAIRS = [
  { pair: 'BTC/ETH', base: 'bitcoin', quote: 'eth' },
  { pair: 'ETH/USDT', base: 'ethereum', quote: 'usd' },
  { pair: 'SOL/USDT', base: 'solana', quote: 'usd' },
  { pair: 'XRP/BTC', base: 'ripple', quote: 'btc' },
  { pair: 'ADA/ETH', base: 'cardano', quote: 'eth' },
  { pair: 'LINK/USDT', base: 'chainlink', quote: 'usd' },
  { pair: 'DOGE/USDT', base: 'dogecoin', quote: 'usd' },
  { pair: 'MATIC/BTC', base: 'matic-network', quote: 'btc' },
  { pair: 'BNB/USDT', base: 'binancecoin', quote: 'usd' },
] as const;

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
    try {
      const ids = Array.from(new Set(PAIRS.map((p) => p.base))).join(',');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,btc,eth`
      );
      const json = (await res.json()) as Record<string, { usd: number; btc: number; eth: number }>;

      const results = PAIRS.map(({ pair, base, quote }) => {
        const price = json[base]?.[quote as 'usd' | 'btc' | 'eth'] ?? 0;
        const p = prev[pair] ?? price;
        const change = p ? ((price - p) / p) * 100 : 0;
        return { pair, price, change } as TickerItem;
      });

      const newPrev: Record<string, number> = {};
      results.forEach((r) => {
        newPrev[r.pair] = r.price;
      });

      setPrev(newPrev);
      setData(results);
    } catch {
      const fallback = PAIRS.map(({ pair }) => ({
        pair,
        price: prev[pair] ?? 0,
        change: 0,
      }));
      setData(fallback);
    }
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
