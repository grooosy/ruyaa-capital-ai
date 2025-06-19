import React from "react";
import { mt4mt5Logo, cryptoLogos } from "@/data/logos";

const LogoCloud: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-x-12 gap-y-8 w-full max-w-3xl mx-auto">
      {/* Trading Platforms & Tether */}
      <div className="flex items-center gap-8">
        <img
          src={mt4mt5Logo.src}
          alt={mt4mt5Logo.alt}
          className="float-y w-36 h-auto opacity-90 drop-shadow-lg transition-transform duration-300 hover:scale-110"
          draggable={false}
        />
        <img
          src="/uploads/b7abfcef-a13f-43b2-a67d-cf8cc6474048.png"
          alt="Tether Exchange Logo"
          className="float-y w-28 h-auto opacity-90 drop-shadow-lg transition-transform duration-300 hover:scale-110"
          draggable={false}
        />
      </div>

      {/* Separator */}
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-green/30 to-transparent mx-4 hidden md:block" />

      {/* Crypto Assets */}
      <div className="flex items-center gap-6">
        {cryptoLogos
          .filter((logo) => logo.alt !== "USDT") // Filter out old Tether logo
          .map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="float-y w-10 h-10 opacity-90 transition-transform duration-300 hover:scale-110"
              draggable={false}
            />
          ))}
      </div>
    </div>
  );
};

export default LogoCloud;
