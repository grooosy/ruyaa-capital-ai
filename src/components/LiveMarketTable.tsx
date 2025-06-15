
import React from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const formatPrice = (price: number | undefined, currency: 'GOLD' | 'BTC') => {
  if (price === undefined) return '$--.--';
  const options: Intl.NumberFormatOptions = currency === 'GOLD' 
    ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    : { maximumFractionDigits: 0 };
  return `$${price.toLocaleString('en-US', options)}`;
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

type MarketTableRowProps = {
    isLoading: boolean;
    price?: number;
    change?: number;
    icon: string;
    name: string;
    symbol: 'BTC' | 'GOLD';
}

const MarketTableRow: React.FC<MarketTableRowProps> = ({ isLoading, price, change, icon, name, symbol }) => {
  const [highlight, setHighlight] = React.useState('');
  const prevPriceRef = React.useRef(price);

  React.useEffect(() => {
    if (prevPriceRef.current !== undefined && price !== undefined && prevPriceRef.current !== price) {
      setHighlight(price > prevPriceRef.current ? 'green' : 'red');
      const timer = setTimeout(() => setHighlight(''), 600);
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = price;
  }, [price]);

  const changeData = formatChange(change);
  
  const highlightClass = highlight === 'green' ? 'bg-green/10' : highlight === 'red' ? 'bg-red-500/10' : '';

  if (isLoading) {
      return (
          <TableRow className="border-none">
              <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                  </div>
              </TableCell>
              <TableCell><Skeleton className="h-5 w-24" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-5 w-16" /></TableCell>
          </TableRow>
      );
  }

  return (
    <TableRow className={cn("border-none hover:bg-white/5 transition-colors duration-300", highlightClass)}>
        <TableCell className="py-4">
            <div className="flex items-center gap-4">
                <img src={icon} alt={name} className="h-9 w-9" />
                <div>
                    <div className="font-bold text-base text-white">{name}</div>
                    <div className="text-sm text-gray-400">{symbol}</div>
                </div>
            </div>
        </TableCell>
        <TableCell className="text-base font-medium text-white">
            {formatPrice(price, symbol)}
        </TableCell>
        <TableCell className={cn("text-right font-medium", changeData.isPositive ? 'text-green' : 'text-red-500')}>
            {changeData.value}
        </TableCell>
    </TableRow>
  )
}

const LiveMarketTable: React.FC = () => {
    const { btc, gold } = useMarketData();

    const assets = [
        {
            name: 'Bitcoin',
            symbol: 'BTC',
            icon: '/logos/btc-official.svg',
            data: btc.data,
            isLoading: btc.isLoading,
        },
        {
            name: 'Gold',
            symbol: 'GOLD',
            icon: '/icons/gold-bars.svg',
            data: gold.data,
            isLoading: gold.isLoading,
        }
    ];

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-white/10 hover:bg-transparent">
                        <TableHead className="text-gray-400 font-medium tracking-wider">Asset</TableHead>
                        <TableHead className="text-gray-400 font-medium tracking-wider">Price</TableHead>
                        <TableHead className="text-right text-gray-400 font-medium tracking-wider">24h Change</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assets.map((asset) => (
                        <MarketTableRow 
                            key={asset.symbol}
                            isLoading={asset.isLoading}
                            price={asset.data?.price}
                            change={asset.data?.change}
                            icon={asset.icon}
                            name={asset.name}
                            symbol={asset.symbol as 'BTC' | 'GOLD'}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default LiveMarketTable;
