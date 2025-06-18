import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ChevronRight } from "lucide-react";
import { PathData } from "@/data/paths";

interface PathCardProps {
  path: PathData;
  isFlipped: boolean;
  onCardClick: (pathId: string) => void;
  onContinue: (pathId: string) => void;
}

const PathCard: React.FC<PathCardProps> = ({
  path,
  isFlipped,
  onCardClick,
  onContinue,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onCardClick(path.id);
  };

  return (
    <div className="relative">
      <Tilt
        glareEnable
        glareMaxOpacity={0.2}
        scale={1.05}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="w-80 h-72 rounded-2xl relative cursor-pointer overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #23221c 0%, #1a1915 100%)`,
            boxShadow: `0 8px 32px ${path.color}20, 0 0 20px ${path.color}10`,
            border: `1px solid ${path.color}30`,
            perspective: "1000px",
          }}
          animate={
            isFlipped
              ? {
                  rotateY: 180,
                }
              : {
                  rotateY: 0,
                }
          }
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* AI-powered reflection animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: isHovered || isClicked ? "100%" : "-100%",
              opacity: isHovered || isClicked ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${path.color}10, transparent, ${path.color}05)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.4 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Particle effects */}
          {(isHovered || isClicked) && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: `${path.color}60`,
                    left: `${15 + i * 10}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, -30, -60],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 2,
                  }}
                />
              ))}
            </div>
          )}

          {/* Front Face */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            <motion.div
              className="flex gap-3 mb-6 flex-wrap items-center justify-center"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isClicked ? [0, 5, -5, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {path.icons.map((icon, i) =>
                icon.type === "img" ? (
                  <motion.div
                    key={i}
                    className="relative"
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <img src={icon.src} alt="" className="w-12 h-12" />
                    {/* Icon glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full blur-md"
                      style={{ backgroundColor: `${path.color}20` }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: isHovered || isClicked ? 1.5 : 0,
                        opacity: isHovered || isClicked ? 0.6 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ) : (
                  <div
                    key={i}
                    className="h-10 px-3 flex items-center justify-center text-sm font-semibold text-white bg-white/10 rounded-lg"
                  >
                    {icon.text}
                  </div>
                ),
              )}
            </motion.div>

            <motion.h3
              className="text-2xl font-bold text-white mb-3 text-center"
              animate={{
                color: isHovered ? path.color : "#ffffff",
              }}
              transition={{ duration: 0.3 }}
            >
              {path.title}
            </motion.h3>

            <p className="text-gray-300 text-center mb-6">{path.subtitle}</p>

            <motion.div
              className="text-sm opacity-70 flex items-center gap-2"
              style={{
                color: path.color,
              }}
              animate={{
                opacity: isHovered ? 1 : 0.7,
                x: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              Click to explore{" "}
              <ChevronRight size={16} className="rtl:rotate-180" />
            </motion.div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex gap-3 mb-6">
              {path.icons
                .slice(0, 2)
                .map((icon, i) =>
                  icon.type === "img" ? (
                    <img key={i} src={icon.src} alt="" className="w-12 h-12" />
                  ) : null,
                )}
            </div>

            <div
              className="text-lg font-semibold mb-4 text-center"
              style={{
                color: path.color,
              }}
            >
              Account Ready in 60 seconds
            </div>

            <p className="text-gray-300 text-center mb-6 text-sm">
              {path.benefit}
            </p>

            <motion.button
              className="px-6 py-3 rounded-xl font-semibold text-[#181711] transition-all duration-200"
              style={{
                backgroundColor: path.color,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onContinue(path.id);
              }}
            >
              Continue Setup
            </motion.button>
          </div>
        </motion.div>
      </Tilt>
    </div>
  );
};

export default PathCard;
