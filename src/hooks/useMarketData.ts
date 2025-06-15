
import { useQuery } from '@tanstack/react-query';

const fetchBtcData = async () => {
  // Switched to CoinGecko API for better reliability and to fix fetch errors
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
  if (!response.ok) {
    throw new Error('Network response was not ok for BTC data');
  }
  const data = await response.json();
  if (!data.bitcoin) {
    throw new Error('Invalid data format from CoinGecko API for BTC');
  }
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
