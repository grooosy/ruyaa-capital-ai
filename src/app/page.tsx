import type React from "react"
import { Helmet } from "react-helmet-async"
import ParticleBackground from "@/components/ParticleBackground"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const Page: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>RuyaaCapital AI - Advanced Trading Platform</title>
        <meta name="description" content="Experience the future of trading with RuyaaCapital's AI-powered platform" />
      </Helmet>

      <div className="relative min-h-screen w-full bg-black font-spacegrotesk overflow-x-hidden">
        <ParticleBackground />
        <Navbar />

        <main className="relative z-10 pt-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-20">
              <h1 className="text-6xl font-bold text-white mb-6">
                Welcome to <span className="text-gradient-ai">RuyaaCapital AI</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the future of trading with our advanced AI-powered platform
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Page
