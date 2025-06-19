"use client"

import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"

export function EnhancedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "nav-glass py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-glow">Ruyaa AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Agents
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Academy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Arbitrage
            </a>
            <button className="futuristic-button px-4 py-2 rounded-lg text-sm">Get Started</button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Agents
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Academy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Arbitrage
              </a>
              <button className="futuristic-button px-4 py-2 rounded-lg text-sm w-fit">Get Started</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
