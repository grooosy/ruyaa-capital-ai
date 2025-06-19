"use client"
import { motion } from "framer-motion"
import ParticleBackground from "@/components/ParticleBackground"
import LiveMarketTicker from "@/components/LiveMarketTicker"
import Navbar from "@/components/Navbar"
import LogoCloud from "@/components/LogoCloud"
import FeatureGrid from "@/components/FeatureGrid"
import AIGrid from "@/components/AIGrid"
import CryptoArbitrageSection from "@/components/CryptoArbitrageSection"
import HeroDashboard from "@/components/HeroDashboard"
import Footer from "@/components/Footer"
import ChatWidget from "@/components/chat/ChatWidget"

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ParticleBackground />
      <LiveMarketTicker />
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-green via-gold to-green bg-clip-text text-transparent">
              AI Trading Revolution
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Experience the future of trading with our advanced AI-powered platform
            </p>
            <LogoCloud />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 w-full max-w-6xl"
          >
            <HeroDashboard />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-white">Powerful Features</h2>
            <FeatureGrid />
          </div>
        </section>

        {/* AI Grid Section */}
        <AIGrid startAnimation={true} />

        {/* Arbitrage Section */}
        <section className="py-20 px-6">
          <CryptoArbitrageSection />
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}

export default Page
