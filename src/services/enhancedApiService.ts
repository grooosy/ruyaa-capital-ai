
import { useToast } from '@/hooks/use-toast';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  source: string;
}

class EnhancedApiService {
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

  private async fetchWithRetry<T>(
    url: string, 
    options: RequestInit = {},
    retries = this.maxRetries
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data, source: url };
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.fetchWithRetry(url, options, retries - 1);
      }
      
      return { 
        error: error instanceof Error ? error.message : 'Unknown error',
        source: url 
      };
    }
  }

  async getBitcoinPrice(): Promise<ApiResponse<{ price: number; change24h: number }>> {
    // Primary source: CoinGecko
    const coinGeckoResponse = await this.fetchWithRetry<any>(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true'
    );

    if (coinGeckoResponse.data) {
      return {
        data: {
          price: coinGeckoResponse.data.bitcoin.usd,
          change24h: coinGeckoResponse.data.bitcoin.usd_24h_change
        },
        source: 'CoinGecko'
      };
    }

    // Fallback: CoinDesk
    const coinDeskResponse = await this.fetchWithRetry<any>(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
    );

    if (coinDeskResponse.data) {
      const price = parseFloat(coinDeskResponse.data.bpi.USD.rate.replace(/,/g, ''));
      return {
        data: { price, change24h: 0 }, // CoinDesk doesn't provide 24h change
        source: 'CoinDesk'
      };
    }

    return { 
      error: 'All Bitcoin price sources unavailable',
      source: 'fallback'
    };
  }

  async getGoldPrice(): Promise<ApiResponse<{ price: number; change24h: number }>> {
    const response = await this.fetchWithRetry<any>(
      'https://data-asg.goldprice.org/dbXRates/USD'
    );

    if (response.data?.items?.[0]) {
      const item = response.data.items[0];
      return {
        data: {
          price: item.xauPrice,
          change24h: item.pcXau
        },
        source: 'GoldPrice.org'
      };
    }

    return { 
      error: 'Gold price service unavailable',
      source: 'GoldPrice.org'
    };
  }
}

export const apiService = new EnhancedApiService();
