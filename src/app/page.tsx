"use client"
import ParticleBackground from "@/components/ParticleBackground"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroDashboard from "@/components/HeroDashboard"
import FeatureGrid from "@/components/FeatureGrid"
import AIGrid from "@/components/AIGrid"
import CryptoArbitrageSection from "@/components/CryptoArbitrageSection"
import LogoCloud from "@/components/LogoCloud"
import LiveMarketTicker from "@/components/LiveMarketTicker"
import ChatWidget from "@/components/chat/ChatWidget"

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <HeroDashboard />
        </section>

        {/* Live Market Ticker */}
        <section className="py-8">
          <LiveMarketTicker />
        </section>

        {/* AI Grid Section */}
        <section className="py-16">
          <AIGrid />
        </section>

        {/* Feature Grid */}
        <section className="py-16">
          <FeatureGrid />
        </section>

        {/* Crypto Arbitrage Section */}
        <section className="py-16">
          <CryptoArbitrageSection />
        </section>

        {/* Logo Cloud */}
        <section className="py-16">
          <LogoCloud />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default Page
