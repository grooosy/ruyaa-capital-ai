import { EnhancedNavbar } from "@/components/enhanced-navbar"
import { FuturisticWrapper, FuturisticButton, GlowText } from "@/components/futuristic-wrapper"
import { Brain, TrendingUp, Shield, Zap, ArrowRight, Bot, BarChart3, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <GlowText className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              RUYAA AI
            </GlowText>
            <h2 className="text-2xl md:text-4xl font-light text-gray-300 mb-8">Advanced Capital Flow Intelligence</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
              Harness the power of artificial intelligence to analyze market patterns, predict capital flows, and
              execute sophisticated trading strategies with unprecedented precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <FuturisticButton className="text-lg px-8 py-4">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Trading
            </FuturisticButton>
            <button className="px-8 py-4 rounded-lg border border-gray-600 text-gray-300 hover:border-blue-500 hover:text-white transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FuturisticWrapper className="text-center">
              <div className="text-3xl font-bold text-glow-cyan mb-2">$2.4B+</div>
              <div className="text-gray-400">Capital Analyzed</div>
            </FuturisticWrapper>
            <FuturisticWrapper className="text-center">
              <div className="text-3xl font-bold text-glow mb-2">94.7%</div>
              <div className="text-gray-400">Prediction Accuracy</div>
            </FuturisticWrapper>
            <FuturisticWrapper className="text-center">
              <div className="text-3xl font-bold text-glow-cyan mb-2">15ms</div>
              <div className="text-gray-400">Execution Speed</div>
            </FuturisticWrapper>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <GlowText className="text-4xl font-bold mb-4">AI-Powered Trading Intelligence</GlowText>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the future of financial technology with our advanced AI systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FuturisticWrapper className="group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-glow">Neural Analysis</h3>
              <p className="text-gray-400">
                Advanced neural networks analyze market patterns and predict capital movements with exceptional
                accuracy.
              </p>
            </FuturisticWrapper>

            <FuturisticWrapper className="group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-400 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-glow">Real-time Insights</h3>
              <p className="text-gray-400">
                Get instant market insights and trading signals powered by real-time data processing and AI analysis.
              </p>
            </FuturisticWrapper>

            <FuturisticWrapper className="group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-400 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-glow">Risk Management</h3>
              <p className="text-gray-400">
                Sophisticated risk assessment algorithms protect your capital while maximizing profit potential.
              </p>
            </FuturisticWrapper>

            <FuturisticWrapper className="group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-400 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-glow">AI Agents</h3>
              <p className="text-gray-400">
                Deploy specialized AI agents for different trading strategies and market conditions.
              </p>
            </FuturisticWrapper>

            <FuturisticWrapper className="group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-glow">Lightning Fast</h3>
              <p className="text-gray-400">
                Execute trades in milliseconds with our high-performance infrastructure and optimized algorithms.
              </p>
            </FuturisticWrapper>

            <FuturisticWrapper className="group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-glow">Advanced Analytics</h3>
              <p className="text-gray-400">
                Comprehensive analytics dashboard with AI-powered insights and predictive modeling.
              </p>
            </FuturisticWrapper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FuturisticWrapper className="p-12">
            <GlowText className="text-4xl font-bold mb-6">Ready to Transform Your Trading?</GlowText>
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of traders who are already using AI to maximize their profits
            </p>
            <FuturisticButton className="text-lg px-8 py-4">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </FuturisticButton>
          </FuturisticWrapper>
        </div>
      </section>
    </div>
  )
}
