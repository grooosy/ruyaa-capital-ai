import React, { useEffect, useState } from 'react';

interface PriceItem {
  label: string;
  symbol: string;
  price: number | null;
}

const fetchJson = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('fetch error');
  return res.json();
};

const LiveMarketTicker: React.FC = () => {
  const [data, setData] = useState<PriceItem[]>([
    { label: 'Gold', symbol: 'XAU', price: null },
    { label: 'BTC', symbol: 'BTC', price: null },
    { label: 'NASDAQ', symbol: 'IXIC', price: null },
    { label: 'DXY', symbol: 'DXY', price: null },
  ]);

  useEffect(() => {
    const load = async () => {
      try {
        const btc = await fetchJson('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const gold = await fetchJson('https://data-asg.goldprice.org/dbXRates/USD');
        const nasdaq = await fetchJson('https://api.twelvedata.com/price?symbol=IXIC&apikey=demo');
        const dxy = await fetchJson('https://api.twelvedata.com/price?symbol=DXY&apikey=demo');
        setData([
          { label: 'Gold', symbol: 'XAU', price: gold?.items?.[0]?.xauPrice ?? null },
          { label: 'BTC', symbol: 'BTC', price: btc?.bitcoin?.usd ?? null },
          { label: 'NASDAQ', symbol: 'IXIC', price: parseFloat(nasdaq?.price) || null },
          { label: 'DXY', symbol: 'DXY', price: parseFloat(dxy?.price) || null },
        ]);
      } catch (e) {
        console.error('ticker fetch error', e);
      }
    };
    load();
    const id = setInterval(load, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full bg-black/30 border-y border-white/10 backdrop-blur-sm overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {data.map((item) => (
          <div key={item.symbol} className="px-6 text-sm font-semibold text-white flex gap-1 items-center">
            <span>{item.label}:</span>
            <span>{item.price ? item.price.toFixed(2) : '...'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarketTicker;
