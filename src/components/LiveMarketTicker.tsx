import React, { useEffect, useState } from 'react';

interface TickerData {
  label: string;
  price: number;
}

const symbols = [
  { id: 'bitcoin', label: 'BTC/USD' },
  { id: 'ethereum', label: 'ETH/USD' },
];

const fallbackPrices: Record<string, number> = {
  bitcoin: 68000,
  ethereum: 3500,
};

const LiveMarketTicker: React.FC = () => {
  const [data, setData] = useState<TickerData[]>([]);

  const fetchPrices = async () => {
    try {
      const ids = symbols.map((s) => s.id).join(',');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      const json = await res.json();
      const newData = symbols.map((s) => ({
        label: s.label,
        price: json[s.id]?.usd ?? fallbackPrices[s.id],
      }));
      setData(newData);
    } catch (e) {
      const newData = symbols.map((s) => ({
        label: s.label,
        price: fallbackPrices[s.id],
      }));
      setData(newData);
    }
  };

  useEffect(() => {
    fetchPrices();
    const id = setInterval(fetchPrices, 30000);
    return () => clearInterval(id);
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden border-y border-green/20 bg-black/30 backdrop-blur-md">
      <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-bg to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2 px-6">
            <span className="font-bold text-white text-sm">{item.label}</span>
            <span className="text-green text-sm">{item.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarketTicker;
