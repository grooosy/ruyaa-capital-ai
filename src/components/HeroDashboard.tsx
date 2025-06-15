import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useMarketData } from '@/hooks/useMarketData';
import { Skeleton } from '@/components/ui/skeleton';

const TickerCard = ({ name, price, change, isLoading }: { name: string, price: string, change: string, isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-white/10 shadow-lg w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">{name}</CardTitle>
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
      </Card>
    );
  }
  
  const [highlight, setHighlight] = React.useState(false);
  const prevPriceRef = React.useRef(price);

  React.useEffect(() => {
    // Highlight only when price changes from a valid previous price
    if (prevPriceRef.current !== price && !prevPriceRef.current.includes('--')) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 500);
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = price;
  }, [price]);

  const isPositive = !change.startsWith('-');

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10 shadow-lg w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{name}</CardTitle>
        {isPositive ? <TrendingUp className="h-4 w-4 text-green" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold text-white transition-colors duration-300 ${highlight ? 'text-gold' : ''}`}>{price}</div>
        <p className={`text-xs ${isPositive ? 'text-green' : 'text-red-500'}`}>{change}</p>
      </CardContent>
    </Card>
  );
};

const performanceData = [
  { name: 'W1', value: 100 },
  { name: 'W2', value: 300 },
  { name: 'W3', value: 200 },
  { name: 'W4', value: 450 },
  { name: 'W5', value: 180 },
  { name: 'W6', value: 600 },
  { name: 'W7', value: 350 },
  { name: 'W8', value: 400 },
  { name: 'W9', value: 200 },
  { name: 'W10', value: 500 },
  { name: 'W11', value: 700 },
  { name: 'W12', value: 650 },
];

const PerformanceChart = () => (
  <Card className="bg-card/50 backdrop-blur-sm border-white/10 shadow-lg w-full">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm font-medium text-gray-400">Portfolio Performance</CardTitle>
        <span className="text-xs text-gray-500">Last 30 days</span>
      </div>
    </CardHeader>
    <CardContent className="h-40 pl-0">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={performanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} width={40} />
          <Tooltip 
            cursor={{ fill: 'rgba(230, 196, 25, 0.1)' }}
            contentStyle={{ backgroundColor: '#23221c', border: 'none', borderRadius: '0.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            labelStyle={{ color: '#E6C419' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="value" fill="#E6C419" radius={[4, 4, 0, 0]} barSize={10} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const HeroDashboard: React.FC = () => {
  const { btc, gold } = useMarketData();

  const formatPrice = (price: number | undefined, currency: 'GOLD' | 'BTC') => {
    if (price === undefined) return '$--';
    const options: Intl.NumberFormatOptions = currency === 'GOLD' 
      ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      : { maximumFractionDigits: 0 };
    return `$${price.toLocaleString('en-US', options)}`;
  };
  
  const formatChange = (change: number | undefined) => {
    if (change === undefined) return '-.-%';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TickerCard 
          name="GOLD" 
          price={formatPrice(gold.data?.price, 'GOLD')} 
          change={formatChange(gold.data?.change)}
          isLoading={gold.isLoading} 
        />
        <TickerCard 
          name="BTC" 
          price={formatPrice(btc.data?.price, 'BTC')} 
          change={formatChange(btc.data?.change)}
          isLoading={btc.isLoading}
        />
      </div>
      <div>
        <PerformanceChart />
      </div>
    </div>
  );
};

export default HeroDashboard;
