
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
  <div className="flex items-center justify-center gap-6 mt-8">
    {logos.map(logo => (
      <img
        key={logo.alt}
        src={logo.src}
        alt={logo.alt}
        className="float-y w-14 h-14 sm:w-16 sm:h-16 opacity-90 drop-shadow-md z-10 transition-transform duration-300"
      />
    ))}
  </div>
);

export default LogoCloud;
