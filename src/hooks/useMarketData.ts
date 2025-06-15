
import { useQuery } from '@tanstack/react-query';

const fetchBtcData = async () => {
  // Switched to CoinCap API for better reliability
  const response = await fetch('https://api.coincap.io/v2/assets/bitcoin');
  if (!response.ok) {
    throw new Error('Network response was not ok for BTC data from CoinCap');
  }
  const result = await response.json();
  const data = result.data;

  if (!data || !data.priceUsd || !data.changePercent24Hr) {
    throw new Error('Invalid data format from CoinCap API for BTC');
  }

  return {
    price: parseFloat(data.priceUsd),
    change: parseFloat(data.changePercent24Hr),
  };
};

const fetchGoldData = async () => {
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
};

export const useMarketData = () => {
  const { data: btcData, isLoading: isBtcLoading, error: btcError } = useQuery({
    queryKey: ['btcPrice'],
    queryFn: fetchBtcData,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const { data: goldData, isLoading: isGoldLoading, error: goldError } = useQuery({
    queryKey: ['goldPrice'],
    queryFn: fetchGoldData,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  if (btcError) console.error("Error fetching BTC data:", btcError);
  if (goldError) console.error("Error fetching Gold data:", goldError);

  return {
    btc: {
      data: btcData,
      isLoading: isBtcLoading,
    },
    gold: {
      data: goldData,
      isLoading: isGoldLoading,
    },
  };
};
