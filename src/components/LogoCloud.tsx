
import React from "react";

const logos = [
  { src: "/logos/mt4.svg", alt: "MT4" },
  { src: "/logos/mt5.svg", alt: "MT5" },
  { src: "/logos/btc.svg", alt: "BTC" },
  { src: "/logos/eth.svg", alt: "ETH" },
  { src: "/logos/usdt.svg", alt: "USDT" },
  { src: "/logos/xrp.svg", alt: "XRP" },
];

const LogoCloud: React.FC = () => (
  <div className="flex items-center justify-center gap-8 mt-8 animate-floating">
    {logos.map(logo => (
      <img
        key={logo.alt}
        src={logo.src}
        alt={logo.alt}
        className="w-12 h-12 lg:w-16 lg:h-16 opacity-90 drop-shadow-md z-10"
        style={{
          animation: "floating 4s ease-in-out infinite",
        }}
      />
    ))}
  </div>
);

export default LogoCloud;
