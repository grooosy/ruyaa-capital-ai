
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/enhancedApiService';

export interface MarketData {
  bitcoin: { price: number; change24h: number; source: string };
  gold: { price: number; change24h: number; source: string };
  lastUpdate: Date;
}

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  const { data: bitcoinData, isLoading: bitcoinLoading, error: bitcoinError } = useQuery({
    queryKey: ['bitcoin-price'],
    queryFn: () => apiService.getBitcoinPrice(),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const { data: goldData, isLoading: goldLoading, error: goldError } = useQuery({
    queryKey: ['gold-price'],
    queryFn: () => apiService.getGoldPrice(),
    refetchInterval: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (bitcoinData?.data && goldData?.data) {
      setMarketData({
        bitcoin: { 
          price: bitcoinData.data.price, 
          change24h: bitcoinData.data.change24h,
          source: bitcoinData.source 
        },
        gold: { 
          price: goldData.data.price, 
          change24h: goldData.data.change24h,
          source: goldData.source 
        },
        lastUpdate: new Date()
      });
    }
  }, [bitcoinData, goldData]);

  return {
    marketData,
    isLoading: bitcoinLoading || goldLoading,
    errors: {
      bitcoin: bitcoinError || bitcoinData?.error,
      gold: goldError || goldData?.error
    }
  };
};
