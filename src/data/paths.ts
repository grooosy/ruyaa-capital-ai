export interface PathIcon {
  type: "img" | "placeholder";
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
      {
        type: "img",
        src: "/lovable-uploads/9dd041af-f3e5-4ac9-b4d8-a8fd480ba5cd.png",
      },
    ],
    color: "#16C784",
    benefit: "1-click withdraw & institutional spreads",
    steps: ["Create", "Deposit", "Pay", "AI On", "Trade"],
  },
  {
    id: "crypto",
    title: "Crypto Exchange",
    subtitle: "Trade Bitcoin, Ethereum & more",
    icons: [
      { type: "img", src: "/logos/btc-official.svg" },
      { type: "img", src: "/logos/eth-official.svg" },
      { type: "img", src: "/logos/usdt-official.svg" },
      { type: "img", src: "/logos/xrp-official.svg" },
    ],
    color: "#E6C419",
    benefit: "On-chain custody & instant arbitrage",
    steps: ["Register", "Connect", "Exchange", "Deposit", "AI On"],
  },
];

// For the "How it Works" section paths
export const paths = [
  {
    id: "signup",
    title: "Sign in to Ruyaa",
    icon: "Zap",
    description: "Create your account and get started with AI-powered trading",
  },
  {
    id: "ai-analysis",
    title: "AI Market Analysis",
    icon: "Brain",
    description:
      "Let our AI analyze markets and recommend the best trading opportunities",
  },
  {
    id: "deposit",
    title: "Enter your info + deposit amount",
    icon: "Download",
    description:
      "Complete your profile and make your first deposit to start trading",
  },
  {
    id: "start-trading",
    title: "Start trading smarter with Ruyaa AI — Not Alone",
    icon: "TrendingUp",
    description:
      "Begin your AI-assisted trading journey with real-time insights",
  },
];
