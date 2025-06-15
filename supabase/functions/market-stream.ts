
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Asset config for easier expansion
const ASSETS = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    coingecko_id: "bitcoin",
    type: "crypto"
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    coingecko_id: "ethereum",
    type: "crypto"
  },
  {
    symbol: "SOL",
    name: "Solana",
    coingecko_id: "solana",
    type: "crypto"
  },
  {
    symbol: "XAU",
    name: "Gold",
    // Gold price in USD via MetalsAPI or fallback
    type: "gold"
  },
  {
    symbol: "IXIC",
    name: "Nasdaq",
    alpha_vantage_symbol: "^IXIC",
    type: "index"
  }
];

// Simple in-memory cache object
let cache: { data: any; timestamp: number } | null = null;

const COINGECKO_API = "https://api.coingecko.com/api/v3";
const ALPHA_VANTAGE_API_KEY = "demo"; // Provide your own for live.
const ALPHA_VANTAGE_BASE = "https://www.alphavantage.co/query";
const GOLD_PRICE_URL = "https://api.coingecko.com/api/v3/simple/price?ids=gold&vs_currencies=usd";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function fetchCrypto(asset) {
  // Get price & 24h change
  const coinData = await fetch(
    `${COINGECKO_API}/coins/${asset.coingecko_id}?localization=false&sparkline=true`
  ).then((r) => r.json());
  const price = coinData.market_data.current_price.usd;
  const change = coinData.market_data.price_change_percentage_24h;
  const spark = coinData.market_data.sparkline_7d.price.slice(-30);
  return {
    symbol: asset.symbol,
    name: asset.name,
    price,
    change24hPct: change,
    sparkline: spark,
  };
}

async function fetchGold() {
  // Get price & 24h change for gold via CoinGecko
  const url = `${COINGECKO_API}/coins/gold?localization=false&sparkline=true`;
  const coinData = await fetch(url).then((r) => r.json());
  const price = coinData.market_data.current_price.usd;
  const change = coinData.market_data.price_change_percentage_24h;
  const spark = coinData.market_data.sparkline_7d.price.slice(-30);
  return {
    symbol: "XAU",
    name: "Gold",
    price,
    change24hPct: change,
    sparkline: spark,
  };
}

async function fetchNasdaq() {
  // Alpha Vantage free version demo only (NOTE: highly rate limited). Replace with your key for live.
  const qs = new URLSearchParams({
    function: "TIME_SERIES_INTRADAY",
    symbol: "^IXIC",
    interval: "5min",
    apikey: ALPHA_VANTAGE_API_KEY,
    datatype: "json",
  }).toString();
  const url = `${ALPHA_VANTAGE_BASE}?${qs}`;
  const data = await fetch(url).then((r) => r.json());

  // Recent prices
  const points: number[] = [];
  if (data["Time Series (5min)"]) {
    const sorted = Object.entries(data["Time Series (5min)"]).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
    for (const [_ts, ohlc] of sorted.slice(-30)) {
      points.push(Number(ohlc["4. close"]));
    }
    // 24h change: estimate from first and last
    const first = Number(sorted[0][1]["4. close"]);
    const last = Number(sorted[sorted.length-1][1]["4. close"]);
    const change = ((last - first) / first) * 100;
    return {
      symbol: "IXIC",
      name: "Nasdaq",
      price: last,
      change24hPct: change,
      sparkline: points,
    };
  } else {
    // fallback (demo quota hit)
    return {
      symbol: "IXIC",
      name: "Nasdaq",
      price: 0,
      change24hPct: 0,
      sparkline: [],
    };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // In-memory 5s cache
  const now = Date.now();
  if (cache && now - cache.timestamp < 5000) {
    return new Response(JSON.stringify(cache.data), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const results = await Promise.all([
      fetchCrypto(ASSETS[0]), // BTC
      fetchCrypto(ASSETS[1]), // ETH
      fetchGold(),            // Gold
      fetchNasdaq(),          // IXIC
      fetchCrypto(ASSETS[2]), // SOL
    ]);
    cache = { data: results, timestamp: Date.now() };
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: (e as Error).message || "Failed to fetch" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});
