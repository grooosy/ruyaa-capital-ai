
import React from "react";

// Official Crypto Assets
const cryptoLogos = [
  { src: "/lovable-uploads/712cf72d-c4e5-4c72-b559-d86f289ffb65.png", alt: "BTC" },
  { src: "/lovable-uploads/53c59e14-0cb1-4d90-b17f-1ed2e5644273.png", alt: "ETH" },
  { src: "/lovable-uploads/895837ee-c142-4899-afc5-ff94600a2d6f.png", alt: "USDT" },
  { src: "/lovable-uploads/9ee24206-7b17-40c4-a4ec-bc6cfd843020.png", alt: "XRP" },
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
          className="float-y w-16 h-16 object-contain opacity-90 drop-shadow-lg transition-transform duration-300 hover:scale-110 mix-blend-multiply"
          draggable={false}
        />
      ))}
    </div>
  </div>
);

export default LogoCloud;
