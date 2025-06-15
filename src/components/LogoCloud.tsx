
import React from "react";

// Official Crypto Assets
const cryptoLogos = [
  { src: "/logos/btc-official.svg", alt: "BTC" },
  { src: "/logos/eth-official.svg", alt: "ETH" },
  { src: "/logos/usdt-official.svg", alt: "USDT" },
  { src: "/logos/xrp-official.svg", alt: "XRP" },
];

const LogoCloud: React.FC = () => (
  <div className="flex items-center justify-center gap-16 mt-12 w-full max-w-2xl mx-auto">
    {/* Trading Platforms */}
    <div className="flex items-center">
      <img
        src="/lovable-uploads/9dd041af-f3e5-4ac9-b4d8-a8fd480ba5cd.png"
        alt="MT4/MT5 Logo"
        className="float-y w-36 h-auto opacity-90 drop-shadow-lg transition-transform duration-300 hover:scale-110"
        draggable={false}
      />
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
