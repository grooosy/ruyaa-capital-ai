
import React from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

const formatPrice = (price: number | undefined) => {
  if (price === undefined) return '$--.--';
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatChange = (change: number | undefined) => {
  if (change === undefined) return { value: '-.-%', isPositive: true };
  const isPositive = change >= 0;
  const sign = isPositive ? '+' : '';
  return {
      value: `${sign}${change.toFixed(2)}%`,
      isPositive: isPositive
  };
};

type AssetRowProps = {
    isLoading: boolean;
    error: Error | null;
    price?: number;
    change?: number;
    icon: string;
    name: string;
    symbol: 'BTC' | 'GOLD';
}

const AssetRow: React.FC<AssetRowProps> = ({ isLoading, error, price, change, icon, name, symbol }) => {
    const [highlight, setHighlight] = React.useState('');
    const prevPriceRef = React.useRef(price);

    React.useEffect(() => {
        if (!isLoading && prevPriceRef.current !== undefined && price !== undefined && prevPriceRef.current !== price) {
            setHighlight(price > prevPriceRef.current ? 'green' : 'red');
            const timer = setTimeout(() => setHighlight(''), 600);
            return () => clearTimeout(timer);
        }
        prevPriceRef.current = price;
    }, [price, isLoading]);

    const changeData = formatChange(change);
    const highlightClass = highlight === 'green' ? 'bg-green/15' : highlight === 'red' ? 'bg-red-500/15' : '';

    if (isLoading) {
        return (
            <div className="flex items-center justify-between p-3 rounded-lg">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 text-red-400">
                <div className="flex items-center gap-3">
                    <img src={icon} alt={name} className="h-10 w-10 opacity-50" />
                    <div>
                        <div className="font-bold text-base text-white">{name}</div>
                        <div className="text-sm text-gray-400">{symbol}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Data unavailable</span>
                </div>
            </div>
        )
    }

    return (
        <div className={cn("flex items-center justify-between p-3 rounded-lg transition-colors duration-300", highlightClass)}>
            <div className="flex items-center gap-3">
                <img src={icon} alt={name} className="h-10 w-10" />
                <div>
                    <div className="font-bold text-base text-white">{name}</div>
                    <div className="text-sm text-gray-400">{symbol}</div>
                </div>
            </div>
            <div className="text-right">
                <div className="font-mono text-base font-medium text-white">{formatPrice(price)}</div>
                <div className={cn("flex items-center justify-end gap-1 text-sm font-medium", changeData.isPositive ? 'text-green' : 'text-red-500')}>
                    {changeData.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span>{changeData.value}</span>
                </div>
            </div>
        </div>
    )
}

const LiveMarketTable: React.FC = () => {
    const { btc, gold } = useMarketData();

    const assets = [
        {
            name: 'Bitcoin',
            symbol: 'BTC',
            icon: '/logos/btc-official.svg',
            ...btc
        },
        {
            name: 'Gold',
            symbol: 'GOLD',
            icon: '/icons/gold-bars.svg',
            ...gold
        }
    ];

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between px-3 py-2 text-xs text-gray-400 font-medium tracking-wider uppercase">
                <span>Asset</span>
                <span>Price</span>
            </div>
            {assets.map((asset) => (
                <AssetRow
                    key={asset.symbol}
                    isLoading={asset.isLoading}
                    error={asset.error as Error | null}
                    price={asset.data?.price}
                    change={asset.data?.change}
                    icon={asset.icon}
                    name={asset.name}
                    symbol={asset.symbol as 'BTC' | 'GOLD'}
                />
            ))}
        </div>
    );
};

export default LiveMarketTable;
