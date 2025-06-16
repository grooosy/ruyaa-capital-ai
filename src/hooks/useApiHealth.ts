
import { useState, useEffect } from 'react';

interface ApiEndpoint {
  name: string;
  url: string;
  status: 'healthy' | 'degraded' | 'down';
  lastChecked: Date;
  responseTime?: number;
}

export const useApiHealth = () => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([
    { name: 'CoinGecko', url: 'https://api.coingecko.com/api/v3/ping', status: 'down', lastChecked: new Date() },
    { name: 'Gold Price', url: 'https://data-asg.goldprice.org/dbXRates/USD', status: 'healthy', lastChecked: new Date() },
    { name: 'CoinDesk', url: 'https://api.coindesk.com/v1/bpi/currentprice.json', status: 'down', lastChecked: new Date() }
  ]);

  const checkEndpointHealth = async (endpoint: ApiEndpoint): Promise<ApiEndpoint> => {
    const startTime = Date.now();
    try {
      const response = await fetch(endpoint.url, { 
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      const responseTime = Date.now() - startTime;
      
      return {
        ...endpoint,
        status: response.ok ? 'healthy' : 'degraded',
        lastChecked: new Date(),
        responseTime
      };
    } catch (error) {
      return {
        ...endpoint,
        status: 'down',
        lastChecked: new Date(),
        responseTime: Date.now() - startTime
      };
    }
  };

  const runHealthCheck = async () => {
    const updatedEndpoints = await Promise.all(
      endpoints.map(endpoint => checkEndpointHealth(endpoint))
    );
    setEndpoints(updatedEndpoints);
  };

  useEffect(() => {
    runHealthCheck();
    const interval = setInterval(runHealthCheck, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return { endpoints, runHealthCheck };
};
