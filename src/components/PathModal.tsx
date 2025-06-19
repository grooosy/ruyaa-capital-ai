import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { PATHS } from "@/data/paths";
import PathCard from "./PathCard";
import SetupSteps from "./SetupSteps";
import { useTranslation } from "react-i18next";

interface PathModalProps {
  open: boolean;
  onClose: () => void;
}

const PathModal: React.FC<PathModalProps> = ({ open, onClose }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const { t } = useTranslation();

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
            className="absolute top-6 end-6 text-green hover:scale-110 transition-transform z-50"
            aria-label="Close modal"
          >
            <X size={32} />
          </button>

          {(flipped || showSteps) && (
            <button
              onClick={handleBack}
              className="absolute top-6 start-6 text-green hover:scale-110 transition-transform z-50 flex items-center gap-2"
            >
              <ArrowLeft size={24} className="rtl:rotate-180" />
              <span className="text-sm">{t('back_button')}</span>
            </button>
          )}

          <div className="w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!showSteps ? (
                <motion.div
                  key="cards"
                  className="flex gap-8 justify-center items-center flex-col sm:flex-row sm:rtl:flex-row-reverse"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {PATHS.map((path) => (
                    <PathCard 
                      key={path.id}
                      path={path}
                      isFlipped={flipped === path.id}
                      onCardClick={handleCardClick}
                      onContinue={handleContinue}
                    />
                  ))}
                </motion.div>
              ) : (
                selectedPath && <SetupSteps selectedPathId={selectedPath} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PathModal;
