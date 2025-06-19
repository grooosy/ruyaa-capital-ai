"use client"

import React from "react"
import { AnimatePresence } from "framer-motion"
import InteractiveAgentCard from "@/components/InteractiveAgentCard"
import AgentDetailModal from "@/components/AgentDetailModal"
import AnimatedFlow from "@/components/AnimatedFlow"
import { useTranslation } from "react-i18next"

type ActiveView = "mt" | "crypto" | null

const AIGrid: React.FC<{ startAnimation?: boolean }> = ({ startAnimation = false }) => {
  const [detailView, setDetailView] = React.useState<ActiveView>(null)
  const { t } = useTranslation()

  const handleOpenDetails = (view: "mt" | "crypto") => {
    setDetailView(view)
  }

  const handleCloseDetails = () => {
    setDetailView(null)
  }

  return (
    <section id="ai" className="w-full max-w-7xl mx-auto py-24 scroll-mt-20">
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-3 h-3 bg-green rounded-full animate-pulse shadow-green-glow"></div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white font-spacegrotesk tracking-tight">
            {t("how_it_works")}
          </h2>
          <button
            onClick={() => {
              const element = document.getElementById("ai")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
                const cards = document.querySelectorAll(".agent-card")
                cards.forEach((card) => {
                  card.classList.add("animate-pulse-subtle")
                  setTimeout(() => card.classList.remove("animate-pulse-subtle"), 3000)
                })
              }
            }}
            className="group flex items-center justify-center w-8 h-8 bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/50 rounded-full transition-all duration-300 hover:scale-110"
          >
            <span className="text-gold text-lg group-hover:animate-bounce">✨</span>
          </button>
        </div>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">{t("how_it_works_desc")}</p>
      </div>

      <AnimatedFlow isVisible={startAnimation} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <InteractiveAgentCard type="mt" onOpenDetails={() => handleOpenDetails("mt")} />
        <InteractiveAgentCard type="crypto" onOpenDetails={() => handleOpenDetails("crypto")} />
      </div>

      <AnimatePresence>
        {detailView && <AgentDetailModal key={detailView} type={detailView} onClose={handleCloseDetails} />}
      </AnimatePresence>
    </section>
  )
}

export default AIGrid
