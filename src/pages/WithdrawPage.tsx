import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import {
  Wallet,
  Banknote,
  Building2,
  PiggyBank,
  Coins,
  HeadphonesIcon,
  MessageCircle,
} from "lucide-react";
import OptionCard from "@/components/OptionCard";

const WithdrawPage: React.FC = () => {
  const options = [
    {
      icon: Building2,
      title: "Withdraw to Bank",
      description: "Transfer funds directly to your bank account",
      color: "from-green/20 to-green/10",
      borderColor: "border-green/30",
    },
    {
      icon: Banknote,
      title: "Withdraw by Cash",
      description: "Cash withdrawal (subject to availability)",
      color: "from-gold/20 to-gold/10",
      borderColor: "border-gold/30",
    },
    {
      icon: Wallet,
      title: "Withdraw to Crypto Wallet",
      description: "Transfer to your cryptocurrency wallet",
      color: "from-blue-500/20 to-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: PiggyBank,
      title: "Withdraw to Saving Account",
      description: "Move funds to your savings account",
      color: "from-purple-500/20 to-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Coins,
      title: "Ruyaa Invest Box",
      description: "Coming soon - Investment portfolio option",
      color: "from-gray-500/20 to-gray-500/10",
      borderColor: "border-gray-500/30",
      comingSoon: true,
    },
    {
      icon: HeadphonesIcon,
      title: "Support",
      description: "Get help with your withdrawal process",
      color: "from-gray-500/20 to-gray-500/10",
      borderColor: "border-gray-500/30",
    },
    {
      icon: MessageCircle,
      title: "Talk to Human",
      description: "Speak with our customer service team",
      color: "from-green/20 to-green/10",
      borderColor: "border-green/30",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0D0D0D]">
      <ParticleBackground />
      <Navbar />
      <main className="pt-32 pb-20 w-full max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Withdrawal Options
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose how you want to withdraw your funds
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((option, idx) => (
            <OptionCard key={idx} {...option} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WithdrawPage;
