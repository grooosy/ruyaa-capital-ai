
import React from "react";

// Official Trading Platforms
const tradingLogos = [
  { src: "/logos/mt4-official.svg", alt: "MT4" },
  { src: "/logos/mt5-official.svg", alt: "MT5" },
];

// Official Crypto Assets
const cryptoLogos = [
  { src: "/logos/btc-official.svg", alt: "BTC" },
  { src: "/logos/eth-official.svg", alt: "ETH" },
  { src: "/logos/usdt-official.svg", alt: "USDT" },
  { src: "/logos/xrp-official.svg", alt: "XRP" },
];

const LogoCloud: React.FC = () => (
  <div className="flex items-center justify-center gap-8 mt-12 w-full max-w-2xl mx-auto">
    {/* Trading Platforms */}
    <div className="flex gap-6 items-center">
      {tradingLogos.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          className="float-y w-12 h-12 opacity-90 drop-shadow-lg transition-transform duration-300 hover:scale-110"
          draggable={false}
        />
      ))}
    </div>
    
    {/* Separator */}
    <div className="w-px h-8 bg-gradient-to-b from-transparent via-green/30 to-transparent mx-4" />
    
    {/* Crypto Assets */}
    <div className="flex gap-6 items-center">
      {cryptoLogos.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          className="float-y w-12 h-12 opacity-90 drop-shadow-lg transition-transform duration-300 hover:scale-110"
          draggable={false}
        />
      ))}
    </div>
  </div>
);

export default LogoCloud;
