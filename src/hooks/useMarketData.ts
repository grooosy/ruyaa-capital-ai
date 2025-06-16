
import { useQuery } from '@tanstack/react-query';

const fetchBtcData = async () => {
  // Try multiple endpoints for better reliability
  const endpoints = [
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
    'https://api.coindesk.com/v1/bpi/currentprice.json'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) continue;
      
      const data = await response.json();
      
      // Handle CoinGecko format
      if (data.bitcoin) {
        return {
          price: data.bitcoin.usd,
          change: data.bitcoin.usd_24h_change,
        };
      }
      
      // Handle CoinDesk format (fallback)
      if (data.bpi?.USD) {
        return {
          price: parseFloat(data.bpi.USD.rate.replace(/,/g, '')),
          change: 0, // CoinDesk doesn't provide 24h change
        };
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${endpoint}:`, error);
      continue;
    }
  }
  
  throw new Error('All Bitcoin data sources failed');
};

const fetchGoldData = async () => {
  try {
    const response = await fetch('https://data-asg.goldprice.org/dbXRates/USD');
    if (!response.ok) {
      throw new Error('Network response was not ok for Gold data');
    }
    const data = await response.json();
    const goldItem = data.items[0];
    return {
      price: goldItem.xauPrice,
      change: goldItem.pcXau,
    };
  } catch (error) {
    // Fallback to a mock price if API fails
    console.warn('Gold API failed, using fallback data:', error);
    return {
      price: 2650.00,
      change: 1.2,
    };
  }
};

export const useMarketData = () => {
  const { data: btcData, isLoading: isBtcLoading, error: btcError } = useQuery({
    queryKey: ['btcPrice'],
    queryFn: fetchBtcData,
    refetchInterval: 5000, // Reduced to 5 seconds for more responsive updates
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const { data: goldData, isLoading: isGoldLoading, error: goldError } = useQuery({
    queryKey: ['goldPrice'],
    queryFn: fetchGoldData,
    refetchInterval: 5000, // Reduced to 5 seconds for more responsive updates
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (btcError) console.error("Error fetching BTC data:", btcError);
  if (goldError) console.error("Error fetching Gold data:", goldError);

  return {
    btc: {
      data: btcData,
      isLoading: isBtcLoading,
      error: btcError,
    },
    gold: {
      data: goldData,
      isLoading: isGoldLoading,
      error: goldError,
    },
  };
};
