
import React from "react";

// Logos for Official Trading Platforms (left)
const leftLogos = [
  { src: "/logos/mt4.svg", alt: "MT4" },
  { src: "/logos/mt5.svg", alt: "MT5" },
];

// Crypto/Exchange Logos (right)
const rightLogos = [
  { src: "/logos/btc.svg", alt: "BTC" },
  { src: "/logos/usdt.svg", alt: "USDT" },
  { src: "/logos/mexc.svg", alt: "MEXC" },
  { src: "/logos/binance.svg", alt: "Binance" },
  { src: "/logos/bingx.svg", alt: "BingX" },
];

const LogoCloud: React.FC = () => (
  <div className="flex flex-row items-center justify-center mt-8 w-full">
    <div className="flex flex-row gap-6 sm:gap-8 items-center">
      {leftLogos.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          className="float-y w-14 h-14 sm:w-16 sm:h-16 opacity-90 drop-shadow-md z-10 transition-transform duration-300"
          draggable={false}
        />
      ))}
    </div>
    <div className="flex-1" />
    <div className="flex flex-row gap-6 sm:gap-8 items-center">
      {rightLogos.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          className="float-y w-14 h-14 sm:w-16 sm:h-16 opacity-90 drop-shadow-md z-10 transition-transform duration-300"
          draggable={false}
        />
      ))}
    </div>
  </div>
);

export default LogoCloud;
