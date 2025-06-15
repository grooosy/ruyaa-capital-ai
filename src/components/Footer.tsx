
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-dark-charcoal to-black border-t border-white/10">
      {/* Neural Network Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg viewBox="0 0 1200 400" className="w-full h-full">
          <defs>
            <linearGradient id="footerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10A169" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#CFA100" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M0,200 Q300,100 600,200 Q900,300 1200,200" stroke="url(#footerGlow)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green to-gold rounded-lg flex items-center justify-center">
                <span className="text-dark-charcoal font-bold text-sm">R</span>
              </div>
              <span className="text-white font-bold text-xl">Ruyaa AI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering traders with intelligent AI-driven solutions for forex, crypto, and arbitrage trading.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors"
              >
                <Twitter className="w-4 h-4 text-gray-400 hover:text-gold" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-gray-400 hover:text-gold" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors"
              >
                <Facebook className="w-4 h-4 text-gray-400 hover:text-gold" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'AI Agents', 'Features', 'Pricing', 'Support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Trading Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg">Trading Services</h3>
            <ul className="space-y-2">
              {['MT4/MT5 Signals', 'Crypto Trading', 'Arbitrage Bots', 'Market Analysis', 'Risk Management'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span className="text-gray-400 text-sm">support@ruyaaai.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span className="text-gray-400 text-sm">+971-XX-XXXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-gray-400 text-sm">Dubai, UAE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Ruyaa AI. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* AI Status Indicator */}
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-green/10 border border-green/20 rounded-full">
            <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
            <span className="text-green text-xs font-medium">AI Systems Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
