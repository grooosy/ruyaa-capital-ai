"use client"

import React, { useState } from "react"
import AiBrainIcon from "./icons/AiBrainIcon"
import ConvergingArrowsIcon from "./icons/ConvergingArrowsIcon"
import VerifiedShieldIcon from "./icons/VerifiedShieldIcon"
import { GraduationCap, LineChart, X } from "lucide-react"
import { useChatContext } from "@/context/ChatContext"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const FeatureGrid: React.FC = () => {
  const [showSignalModal, setShowSignalModal] = useState(false)
  const { openChat } = useChatContext()
  const navigate = useNavigate()

  const handleFeatureClick = (featureTitle: string) => {
    switch (featureTitle) {
      case "Verified Broker":
        const aiSection = document.getElementById("ai")
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: "smooth" })
        }
        break
      case "24/7 Ruyaa AI Assistant":
        openChat(null)
        break
      case "Trading Academy + Mentor":
        navigate("/academy")
        break
      case "Live Ticker + Signal Feed":
        setShowSignalModal(true)
        break
      case "Crypto Arbitrage System":
        const arbitrageSection = document.querySelector('[class*="CryptoArbitrageSection"]')
        if (arbitrageSection) {
          arbitrageSection.scrollIntoView({ behavior: "smooth" })
        }
        break
    }
  }

  const features = [
    {
      icon: <VerifiedShieldIcon />,
      title: "Verified Broker",
      subtitle: "1-Click Withdraw",
      color: "from-green/20 to-emerald-500/20",
    },
    {
      icon: <AiBrainIcon />,
      title: "24/7 Ruyaa AI Assistant",
      subtitle: "Always available to help",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Trading Academy + Mentor",
      subtitle: "Learn with guidance",
      color: "from-gold/20 to-yellow-500/20",
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Live Ticker + Signal Feed",
      subtitle: "Real-time trading data",
      color: "from-green/20 to-emerald-500/20",
    },
    {
      icon: <ConvergingArrowsIcon />,
      title: "Crypto Arbitrage System",
      subtitle: "Auto profit scan",
      color: "from-purple-500/20 to-violet-500/20",
    },
  ]

  return (
    <>
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => handleFeatureClick(feature.title)}
              className="group relative flex flex-col items-center justify-center text-center w-44 h-44 bg-gradient-to-br from-black/90 via-gray-900/50 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:border-green/40 hover:shadow-green/30 hover:shadow-2xl cursor-pointer hover:scale-105"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] rounded-2xl" />

              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green/0 via-green/50 to-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-beam-flow"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(16, 161, 105, 0.3), transparent)",
                  backgroundSize: "200% 100%",
                }}
              />

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-green/10 to-green/5 border border-green/20 transition-all duration-500 group-hover:scale-110 group-hover:border-green/60 group-hover:bg-green/20 group-hover:shadow-green/30">
                  {React.cloneElement(feature.icon, {
                    className:
                      "w-8 h-8 text-green group-hover:text-white transition-all duration-500 group-hover:drop-shadow-lg",
                  })}
                </div>

                <h3 className="text-sm font-bold text-white mb-2 transition-all duration-500 group-hover:text-green font-spacegrotesk text-center leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-500 text-center leading-relaxed">
                  {feature.subtitle}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl border border-green/0 group-hover:border-green/30 group-hover:animate-pulse-subtle transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showSignalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSignalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-black/95 via-gray-900/90 to-black/95 backdrop-blur-xl border border-green/20 rounded-2xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowSignalModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-green/10 border border-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LineChart className="w-8 h-8 text-green" />
                </div>

                <h3 className="text-xl font-bold text-white mb-4 font-spacegrotesk">Live Signal Feed</h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Join the waitlist – This isn't just a signal. It's an AI engine that understands market reasoning.
                </p>

                <div className="flex items-center gap-2 justify-center mb-4">
                  <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                  <span className="text-green text-sm font-medium">AI Engine Active</span>
                </div>

                <button
                  onClick={() => setShowSignalModal(false)}
                  className="w-full bg-green text-black py-3 rounded-xl font-semibold hover:bg-green/90 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FeatureGrid
