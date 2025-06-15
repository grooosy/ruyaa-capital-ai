import React from "react";
import { mt4mt5Logo, cryptoLogos } from "@/data/logos";
const LogoCloud: React.FC = () => <div className="flex items-center justify-center gap-16 w-full max-w-2xl mx-auto">
    {/* Trading Platforms */}
    <div className="flex items-center">
      <img src={mt4mt5Logo.src} alt={mt4mt5Logo.alt} className="float-y w-36 h-auto opacity-90 drop-shadow-lg transition-transform duration-300 hover:scale-110" draggable={false} />
    </div>
    
    {/* Separator */}
    <div className="w-px h-8 bg-gradient-to-b from-transparent via-green/30 to-transparent mx-4" />
    
    {/* Crypto Assets */}
    
  </div>;
export default LogoCloud;