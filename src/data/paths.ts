
export interface PathIcon {
  type: 'img' | 'placeholder';
  src?: string;
  text?: string;
}

export interface PathData {
  id: string;
  title: string;
  subtitle: string;
  icons: PathIcon[];
  color: string;
  benefit: string;
  steps: string[];
}

export const PATHS: PathData[] = [
  {
    id: "trading",
    title: "MT4 / MT5 Trading",
    subtitle: "Professional forex & CFD trading",
    icons: [
      { type: 'img', src: "/lovable-uploads/9dd041af-f3e5-4ac9-b4d8-a8fd480ba5cd.png" },
      { type: 'placeholder', text: 'Visa' },
      { type: 'placeholder', text: 'Mastercard' },
      { type: 'placeholder', text: 'Phantom' },
    ],
    color: "#16C784",
    benefit: "1-click withdraw & institutional spreads",
    steps: ["Create", "Deposit", "Pay", "AI On", "Trade"]
  },
  {
    id: "crypto",
    title: "Crypto Exchange",
    subtitle: "Trade Bitcoin, Ethereum & more", 
    icons: [
      { type: 'img', src: "/logos/btc-official.svg" },
      { type: 'img', src: "/logos/eth-official.svg" },
      { type: 'img', src: "/logos/usdt-official.svg" },
      { type: 'img', src: "/logos/xrp-official.svg" },
    ],
    color: "#E6C419",
    benefit: "On-chain custody & instant arbitrage",
    steps: ["Register", "Connect", "Exchange", "Deposit", "AI On"]
  },
];
