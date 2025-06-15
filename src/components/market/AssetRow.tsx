
import React, { useEffect, useState } from 'react';
import { Brain, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PriceAnalysis, AssetRowProps } from '@/types/market';
import { generateAIAnalysis } from '@/utils/aiAnalysis';
import { formatPrice } from '@/utils/priceFormatter';

const AssetRow: React.FC<AssetRowProps> = ({ asset, name, symbol, icon }) => {
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
            ${formatPrice(price, symbol)}
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

export default AssetRow;
