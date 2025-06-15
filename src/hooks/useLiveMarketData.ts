
import React from "react";

export interface MarketDataPoint {
  time: number;
  value: number;
}

export const useLiveMarketData = (): MarketDataPoint[] => {
  const [data, setData] = React.useState<MarketDataPoint[]>(() =>
    Array.from({ length: 40 }, (_, i) => ({
      time: i,
      value: 1660 + 22 * Math.sin(i / 4),
    }))
  );

  React.useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1).concat({
          time: prev[prev.length - 1].time + 1,
          value:
            1660 +
            22 *
              Math.sin((prev[prev.length - 1].time + 1) / 4 + Date.now() / 7000),
        });
        return next;
      });
    }, 950);
    return () => clearInterval(id);
  }, []);

  return data;
};
