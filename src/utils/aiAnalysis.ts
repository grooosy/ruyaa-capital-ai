
import { PriceAnalysis } from '@/types/market';

export const generateAIAnalysis = (price: number, change: number): PriceAnalysis => {
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
