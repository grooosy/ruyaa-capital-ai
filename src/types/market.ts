export interface PriceAnalysis {
  trend: 'bullish' | 'bearish' | 'neutral';
  signal: 'buy' | 'sell' | 'hold';
  confidence: number;
}

export interface AssetData {
  price: number;
  change: number;
}

export interface MarketAsset {
  data?: AssetData;
  isLoading: boolean;
  error: any;
}

export interface AssetRowProps {
  asset: MarketAsset;
  name: string;
  symbol: string;
  icon: string;
}
