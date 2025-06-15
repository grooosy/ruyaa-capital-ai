
import { useQuery } from '@tanstack/react-query';

const fetchBtcData = async () => {
  // Switched to CoinCap API for better reliability
  const response = await fetch('https://api.coincap.io/v2/assets/bitcoin');
  if (!response.ok) {
    throw new Error('Network response was not ok for BTC data');
  }
  const data = await response.json();
  return {
    price: parseFloat(data.data.priceUsd),
    change: parseFloat(data.data.changePercent24Hr),
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
    refetchInterval: 7000, // Refetch every 7 seconds
  });

  const { data: goldData, isLoading: isGoldLoading, error: goldError } = useQuery({
    queryKey: ['goldPrice'],
    queryFn: fetchGoldData,
    refetchInterval: 7000, // Refetch every 7 seconds
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
