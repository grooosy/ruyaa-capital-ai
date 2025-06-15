
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { X, ArrowLeft } from "lucide-react";

const CARDS = [
  {
    id: "mt",
    title: "MetaTrader",
    subtitle: "Trade FX, Indices, Commodities",
    icon: "/logos/mt4.svg",
    accent: "#16C784",
    bg: "#23221c",
    snapshot: {
      img: "/logos/mt4.svg",
      label: "Verified MT Account Ready",
    },
  },
  {
    id: "crypto",
    title: "Crypto",
    subtitle: "Trade BTC, ETH, USDT & more",
    icon: "/logos/btc.svg",
    accent: "#E6C419",
    bg: "#23221c",
    snapshot: {
      img: "/logos/btc.svg",
      label: "Your Wallet, Your Coins",
    },
  },
];

interface PathModalProps {
  open: boolean;
  onClose: () => void;
}
const cardVariants = {
  initial: { opacity: 0, scale: 0.9, y: 60 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { delay: .18, type: "spring", stiffness: 70 } },
  exit: { opacity: 0, scale: 0.95, y: 40 },
};

const flipVariants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};

const snapshotStyle = {
  transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"]
};

const PathModal: React.FC<PathModalProps> = ({ open, onClose }) => {
  const [flipped, setFlipped] = useState<null | "mt" | "crypto">(null);

  // Modal content
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#181711ee] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .23 }}
        >
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute top-6 right-7 text-green hover:scale-110 focus:outline-none"
          >
            <X size={32} />
          </button>
          {/* Cards container */}
          <div className="flex gap-10 flex-col sm:flex-row w-full max-w-3xl items-center justify-center z-10">
            {CARDS.map(card => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative"
              >
                <Tilt glareEnable glareMaxOpacity={0.16} scale={1.04} tiltMaxAngleX={9} tiltMaxAngleY={9}>
                  {/* Flip card structure */}
                  <div
                    style={{
                      perspective: "1000px",
                      width: 320, height: 260,
                    }}
                  >
                    <motion.div
                      className="w-80 h-64 rounded-2xl bg-[#23221c] relative shadow-green"
                      animate={flipped === card.id ? "back" : "front"}
                      variants={flipVariants}
                      style={{
                        ...snapshotStyle,
                        transition: "transform 0.58s cubic-bezier(.68,-0.55,.27,1.55)",
                        boxShadow: `0 2px 22px 0 ${card.accent}26`,
                        cursor: flipped === card.id ? "default" : "pointer"
                      }}
                      onClick={() => !flipped && setFlipped(card.id as "mt" | "crypto")}
                    >
                      {/* Front Face */}
                      <div className={`absolute inset-0 flex flex-col items-center justify-center z-10`} style={{ backfaceVisibility: "hidden" }}>
                        <img src={card.icon} alt={card.title} className="w-16 h-16 mb-5" />
                        <h2 className="text-xl font-bold text-white">{card.title}</h2>
                        <p className="mt-2 text-base text-gray-300">{card.subtitle}</p>
                        <div className="mt-4 text-sm text-green opacity-60">
                          Click to Snapshot
                        </div>
                      </div>
                      {/* Back Face */}
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center z-20"
                        style={{
                          transform: "rotateY(180deg)",
                          backfaceVisibility: "hidden"
                        }}
                      >
                        <img src={card.snapshot.img} alt={card.title} className="w-16 h-16 mb-5" />
                        <div className="font-bold text-green mb-2 text-lg">{card.snapshot.label}</div>
                        <button
                          className="mt-5 bg-gold px-4 py-2 rounded-xl font-semibold text-[#181711] flex items-center gap-1 hover:bg-yellow-400 transition"
                          onClick={e => {
                            e.stopPropagation();
                            setFlipped(null);
                          }}
                        >
                          <ArrowLeft size={18} /> Back
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PathModal;
