
import React from "react";
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
  onContinue
}) => {
  return <div className="relative">
      <Tilt glareEnable glareMaxOpacity={0.2} scale={1.05} tiltMaxAngleX={10} tiltMaxAngleY={10} style={{
      transformStyle: "preserve-3d"
    }}>
        <motion.div className="w-80 h-72 rounded-2xl relative cursor-pointer" style={{
        background: `linear-gradient(135deg, #23221c 0%, #1a1915 100%)`,
        boxShadow: `0 8px 32px ${path.color}20, 0 0 20px ${path.color}10`,
        border: `1px solid ${path.color}30`,
        perspective: "1000px"
      }} animate={isFlipped ? {
        rotateY: 180
      } : {
        rotateY: 0
      }} transition={{
        duration: 0.6,
        ease: "easeInOut"
      }} onClick={() => onCardClick(path.id)}>
          {/* Front Face */}
          <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6" style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(0deg)"
        }}>
            <div className="flex gap-3 mb-6 flex-wrap items-center justify-center">
              {path.icons.map((icon, i) => icon.type === 'img' ? <img key={i} src={icon.src} alt="" className="w-12 h-12" /> : <div key={i} className="h-10 px-3 flex items-center justify-center text-sm font-semibold text-white bg-white/10 rounded-lg">
                    {icon.text}
                  </div>)}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 text-center">
              {path.title}
            </h3>
            <p className="text-gray-300 text-center mb-6">
              {path.subtitle}
            </p>
            <div className="text-sm opacity-70 flex items-center gap-2" style={{
            color: path.color
          }}>
              Click to explore <ChevronRight size={16} className="rtl:rotate-180" />
            </div>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6" style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)"
        }}>
            <div className="flex gap-3 mb-6">
              {path.icons.slice(0, 2).map((icon, i) => icon.type === 'img' ? <img key={i} src={icon.src} alt="" className="w-12 h-12" /> : null)}
            </div>
            <div className="text-lg font-semibold mb-4 text-center" style={{
            color: path.color
          }}>
              Account Ready in 60 seconds
            </div>
            <p className="text-gray-300 text-center mb-6 text-sm">
              {path.benefit}
            </p>
            <button className="px-6 py-3 rounded-xl font-semibold text-[#181711] transition-all duration-200 hover:scale-105" style={{
            backgroundColor: path.color
          }} onClick={e => {
            e.stopPropagation();
            onContinue(path.id);
          }}>
              Continue Setup
            </button>
          </div>
        </motion.div>
      </Tilt>
    </div>;
};
export default PathCard;
