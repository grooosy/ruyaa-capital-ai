import React, { useEffect, useState } from 'react';

interface TickerData {
  label: string;
  price: number;
}

const cryptoSymbols = [
  { id: 'bitcoin', label: 'BTC/USD' },
  { id: 'ethereum', label: 'ETH/USD' },
];

const marketSymbols = [
  { symbol: 'XAU/USD', label: 'GOLD' },
  { symbol: 'EUR/USD', label: 'EURUSD' },
  { symbol: 'NDX', label: 'NASDAQ' },
  { symbol: 'DXY', label: 'DXY' },
];

const fallbackPrices: Record<string, number> = {
  bitcoin: 68000,
  ethereum: 3500,
  gold: 2300,
  eurusd: 1.07,
  nasdaq: 17000,
  dxy: 103,
};

const LiveMarketTicker: React.FC = () => {
  const [data, setData] = useState<TickerData[]>([]);

  const fetchPrices = async () => {
    try {
      const cryptoIds = cryptoSymbols.map((s) => s.id).join(',');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd`
      );
      const json = await res.json();
      const cryptoData = cryptoSymbols.map((s) => ({
        label: s.label,
        price: json[s.id]?.usd ?? fallbackPrices[s.id],
      }));

      const twelveKey =
        import.meta.env.VITE_TWELVEDATA_API_KEY || import.meta.env.TWELVEDATA_API_KEY || 'demo';
      const otherData = await Promise.all(
        marketSymbols.map(async (s) => {
          try {
            const r = await fetch(
              `https://api.twelvedata.com/price?symbol=${s.symbol}&apikey=${twelveKey}`
            );
            const j = await r.json();
            const price = parseFloat(j.price);
            if (isNaN(price)) throw new Error('price');
            return { label: s.label, price };
          } catch {
            const key = s.label.toLowerCase();
            return { label: s.label, price: fallbackPrices[key] };
          }
        })
      );

      setData([...cryptoData, ...otherData]);
    } catch (e) {
      const newData = [
        ...cryptoSymbols.map((s) => ({
          label: s.label,
          price: fallbackPrices[s.id],
        })),
        ...marketSymbols.map((s) => ({
          label: s.label,
          price: fallbackPrices[s.label.toLowerCase()],
        })),
      ];
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
    <div className="fixed top-0 left-0 z-20 w-full overflow-hidden border-b border-green/20 bg-black/30 backdrop-blur-md">
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
