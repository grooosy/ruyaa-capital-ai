
import React, { useEffect, useState } from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import { Brain, TrendingUp, TrendingDown, Zap, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceAnalysis {
  trend: 'bullish' | 'bearish' | 'neutral';
  signal: 'buy' | 'sell' | 'hold';
  confidence: number;
}

const generateAIAnalysis = (price: number, change: number): PriceAnalysis => {
  const absChange = Math.abs(change);
  let trend: PriceAnalysis['trend'] = 'neutral';
  let signal: PriceAnalysis['signal'] = 'hold';
  let confidence = 50;

  if (change > 2) {
    trend = 'bullish';
    signal = 'buy';
    confidence = Math.min(95, 60 + absChange * 5);
  } else if (change < -2) {
    trend = 'bearish';
    signal = 'sell';
    confidence = Math.min(95, 60 + absChange * 5);
  } else if (change > 0.5) {
    trend = 'bullish';
    signal = 'hold';
    confidence = Math.min(80, 55 + absChange * 3);
  } else if (change < -0.5) {
    trend = 'bearish';
    signal = 'hold';
    confidence = Math.min(80, 55 + absChange * 3);
  }

  return { trend, signal, confidence };
};

const AssetRow = ({ asset, name, symbol, icon }: {
  asset: any;
  name: string;
  symbol: string;
  icon: string;
}) => {
  const [aiAnalysis, setAiAnalysis] = useState<PriceAnalysis>({ trend: 'neutral', signal: 'hold', confidence: 50 });
  const [isUpdating, setIsUpdating] = useState(false);
  const [prevPrice, setPrevPrice] = useState<number | undefined>();

  useEffect(() => {
    if (asset.data?.price && asset.data?.change !== undefined) {
      setAiAnalysis(generateAIAnalysis(asset.data.price, asset.data.change));
      
      if (prevPrice !== undefined && prevPrice !== asset.data.price) {
        setIsUpdating(true);
        setTimeout(() => setIsUpdating(false), 1000);
      }
      setPrevPrice(asset.data.price);
    }
  }, [asset.data?.price, asset.data?.change, prevPrice]);

  if (asset.isLoading) {
    return (
      <div className="relative bg-black/40 backdrop-blur-md border border-green/20 rounded-xl p-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green/20 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="w-16 h-4 bg-green/20 rounded animate-pulse" />
              <div className="w-12 h-3 bg-green/10 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-20 h-4 bg-green/20 rounded animate-pulse" />
            <div className="w-16 h-3 bg-green/10 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (asset.error) {
    return (
      <div className="relative bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <img src={icon} alt={name} className="w-10 h-10 opacity-50" />
          <div>
            <div className="font-bold text-white">{name}</div>
            <div className="text-xs text-red-400">AI Analysis Unavailable</div>
          </div>
        </div>
      </div>
    );
  }

  const price = asset.data?.price || 0;
  const change = asset.data?.change || 0;
  const isPositive = change >= 0;

  return (
    <div className={cn(
      "relative bg-black/40 backdrop-blur-md border rounded-xl p-4 transition-all duration-300 group hover:bg-black/60",
      isUpdating ? "border-gold/60 shadow-gold-glow" : "border-green/20",
      "hover:border-green/40 hover:shadow-green-glow"
    )}>
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] rounded-xl" />
      
      {/* AI Activity Indicator */}
      <div className="absolute top-2 right-2">
        <div className={cn(
          "w-2 h-2 rounded-full animate-pulse",
          aiAnalysis.confidence > 70 ? "bg-green" : aiAnalysis.confidence > 50 ? "bg-gold" : "bg-gray-400"
        )} />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={icon} alt={name} className="w-10 h-10" />
            {isUpdating && (
              <div className="absolute -inset-1 border-2 border-gold/60 rounded-full animate-ping" />
            )}
          </div>
          <div>
            <div className="font-bold text-white font-spacegrotesk">{name}</div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Brain className="w-3 h-3" />
              AI {aiAnalysis.signal.toUpperCase()} • {aiAnalysis.confidence}%
            </div>
          </div>
        </div>

        <div className="text-right space-y-1">
          <div className="font-mono text-lg font-bold text-white">
            ${price.toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: symbol === 'BTC' ? 0 : 2 
            })}
          </div>
          <div className={cn(
            "flex items-center justify-end gap-1 text-sm font-semibold",
            isPositive ? 'text-green' : 'text-red-400'
          )}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {aiAnalysis.trend} trend
          </div>
        </div>
      </div>

      {/* AI Confidence Bar */}
      <div className="mt-3 space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>AI Confidence</span>
          <span>{aiAnalysis.confidence}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
          <div 
            className={cn(
              "h-1.5 rounded-full transition-all duration-1000",
              aiAnalysis.confidence > 70 ? "bg-green" : 
              aiAnalysis.confidence > 50 ? "bg-gold" : "bg-gray-400"
            )}
            style={{ width: `${aiAnalysis.confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const AIMarketTable: React.FC = () => {
  const { btc, gold } = useMarketData();
  const [aiStatus, setAiStatus] = useState('Analyzing Market Patterns...');

  useEffect(() => {
    const statusMessages = [
      'Analyzing Market Patterns...',
      'Processing Real-time Data...',
      'AI Neural Network Active...',
      'Computing Price Predictions...',
      'Monitoring Global Markets...'
    ];
    
    const interval = setInterval(() => {
      setAiStatus(statusMessages[Math.floor(Math.random() * statusMessages.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* AI Header */}
      <div className="flex items-center justify-between p-4 bg-black/30 backdrop-blur-md border border-green/20 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Brain className="w-6 h-6 text-green animate-pulse" />
            <div className="absolute -inset-1 border border-green/30 rounded-full animate-ping" />
          </div>
          <div>
            <h3 className="font-bold text-white font-spacegrotesk">AI Market Intelligence</h3>
            <p className="text-xs text-green">{aiStatus}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-gold animate-pulse" />
          <span className="text-xs text-gold font-medium">LIVE</span>
        </div>
      </div>

      {/* Asset Rows */}
      <div className="space-y-3">
        <AssetRow
          asset={btc}
          name="Bitcoin"
          symbol="BTC"
          icon="/logos/btc-official.svg"
        />
        <AssetRow
          asset={gold}
          name="Gold"
          symbol="GOLD"
          icon="/icons/gold-bars.svg"
        />
      </div>

      {/* AI Insights Footer */}
      <div className="p-3 bg-green/5 backdrop-blur-md border border-green/10 rounded-xl">
        <div className="flex items-center gap-2 text-xs text-green">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>AI-powered real-time analysis • Market data refreshed every 5 seconds</span>
        </div>
      </div>
    </div>
  );
};

export default AIMarketTable;
