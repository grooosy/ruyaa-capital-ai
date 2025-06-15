
import { useQuery } from '@tanstack/react-query';

const fetchBtcData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
  if (!response.ok) {
    throw new Error('Network response was not ok for BTC data');
  }
  const data = await response.json();
  return {
    price: data.bitcoin.usd,
    change: data.bitcoin.usd_24h_change,
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
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: goldData, isLoading: isGoldLoading, error: goldError } = useQuery({
    queryKey: ['goldPrice'],
    queryFn: fetchGoldData,
    refetchInterval: 30000, // Refetch every 30 seconds
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
