
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { X, ArrowLeft, ChevronRight } from "lucide-react";

interface PathIcon {
  type: 'img' | 'placeholder';
  src?: string;
  text?: string;
}

const PATHS: Array<{
  id: string;
  title: string;
  subtitle: string;
  icons: PathIcon[];
  color: string;
  benefit: string;
  steps: string[];
}> = [
  {
    id: "trading",
    title: "MT4 / MT5 Trading",
    subtitle: "Professional forex & CFD trading",
    icons: [
      { type: 'img', src: "/logos/mt4-official.svg" },
      { type: 'img', src: "/logos/mt5-official.svg" },
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

interface PathModalProps {
  open: boolean;
  onClose: () => void;
}

const PathModal: React.FC<PathModalProps> = ({ open, onClose }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);

  const handleCardClick = (pathId: string) => {
    if (!flipped) {
      setFlipped(pathId);
    }
  };

  const handleContinue = (pathId: string) => {
    setSelectedPath(pathId);
    setShowSteps(true);
  };

  const handleBack = () => {
    if (showSteps) {
      setShowSteps(false);
      setSelectedPath(null);
    } else {
      setFlipped(null);
    }
  };

  const reset = () => {
    setFlipped(null);
    setSelectedPath(null);
    setShowSteps(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-green hover:scale-110 transition-transform z-50"
            aria-label="Close modal"
          >
            <X size={32} />
          </button>

          {(flipped || showSteps) && (
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 text-green hover:scale-110 transition-transform z-50 flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              <span className="text-sm">Back</span>
            </button>
          )}

          <div className="w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!showSteps ? (
                <motion.div
                  key="cards"
                  className="flex gap-8 justify-center items-center flex-col sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {PATHS.map((path) => (
                    <div key={path.id} className="relative">
                      <Tilt
                        glareEnable
                        glareMaxOpacity={0.2}
                        scale={1.05}
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={10}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <motion.div
                          className="w-80 h-72 rounded-2xl relative cursor-pointer"
                          style={{
                            background: `linear-gradient(135deg, #23221c 0%, #1a1915 100%)`,
                            boxShadow: `0 8px 32px ${path.color}20, 0 0 20px ${path.color}10`,
                            border: `1px solid ${path.color}30`,
                            perspective: "1000px"
                          }}
                          animate={flipped === path.id ? { rotateY: 180 } : { rotateY: 0 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          onClick={() => handleCardClick(path.id)}
                        >
                          {/* Front Face */}
                          <div
                            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6"
                            style={{ 
                              backfaceVisibility: "hidden",
                              transform: "rotateY(0deg)"
                            }}
                          >
                            <div className="flex gap-3 mb-6 flex-wrap items-center justify-center">
                              {path.icons.map((icon, i) =>
                                icon.type === 'img' ? (
                                  <img key={i} src={icon.src} alt="" className="w-12 h-12" />
                                ) : (
                                  <div key={i} className="h-10 px-3 flex items-center justify-center text-sm font-semibold text-white bg-white/10 rounded-lg">
                                    {icon.text}
                                  </div>
                                )
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 text-center">
                              {path.title}
                            </h3>
                            <p className="text-gray-300 text-center mb-6">
                              {path.subtitle}
                            </p>
                            <div 
                              className="text-sm opacity-70 flex items-center gap-2"
                              style={{ color: path.color }}
                            >
                              Click to explore <ChevronRight size={16} />
                            </div>
                          </div>

                          {/* Back Face */}
                          <div
                            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6"
                            style={{ 
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg)"
                            }}
                          >
                            <div className="flex gap-3 mb-6">
                              {path.icons.slice(0, 2).map((icon, i) => (
                                icon.type === 'img' ? 
                                <img key={i} src={icon.src} alt="" className="w-12 h-12" />
                                : null
                              ))}
                            </div>
                            <div 
                              className="text-lg font-semibold mb-4 text-center"
                              style={{ color: path.color }}
                            >
                              Account Ready in 60 seconds
                            </div>
                            <p className="text-gray-300 text-center mb-6 text-sm">
                              {path.benefit}
                            </p>
                            <button
                              className="px-6 py-3 rounded-xl font-semibold text-[#181711] transition-all duration-200 hover:scale-105"
                              style={{ backgroundColor: path.color }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleContinue(path.id);
                              }}
                            >
                              Continue Setup
                            </button>
                          </div>
                        </motion.div>
                      </Tilt>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="steps"
                  className="text-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {selectedPath && (
                    <>
                      <h2 className="text-3xl font-bold text-white mb-8">
                        Setup Process
                      </h2>
                      <div className="flex justify-center items-center gap-8 mb-12">
                        {PATHS.find(p => p.id === selectedPath)?.steps.map((step, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3"
                              style={{ 
                                borderColor: PATHS.find(p => p.id === selectedPath)?.color,
                                backgroundColor: `${PATHS.find(p => p.id === selectedPath)?.color}20`
                              }}
                            >
                              <span className="text-2xl font-bold" style={{ color: PATHS.find(p => p.id === selectedPath)?.color }}>
                                {index + 1}
                              </span>
                            </div>
                            <span className="text-white font-medium">{step}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        className="px-8 py-4 rounded-xl font-bold text-[#181711] text-lg transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: PATHS.find(p => p.id === selectedPath)?.color }}
                      >
                        Proceed to Checkout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PathModal;
