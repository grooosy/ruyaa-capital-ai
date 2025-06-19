import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  CreditCard,
  Bitcoin,
  Gift,
  HeadphonesIcon,
  MessageCircle,
  Banknote,
  PiggyBank,
  ArrowRight,
  Building2,
  Coins,
} from "lucide-react";

interface DepositPageProps {
  initialTab?: "deposit" | "withdraw";
}

const DepositPage: React.FC<DepositPageProps> = ({ initialTab = "deposit" }) => {
  const tab =
    new URLSearchParams(window.location.search).get("tab") || initialTab;

  const depositOptions = [
    {
      icon: Building2,
      title: "Deposit in Forex Account",
      description: "Add funds directly to your MT4/MT5 trading account",
      color: "from-green/20 to-green/10",
      borderColor: "border-green/30",
    },
    {
      icon: Bitcoin,
      title: "Crypto Exchange Account",
      description: "Deposit to your cryptocurrency exchange wallet",
      color: "from-gold/20 to-gold/10",
      borderColor: "border-gold/30",
    },
    {
      icon: Wallet,
      title: "Crypto Wallet",
      description: "Transfer to your personal crypto wallet",
      color: "from-blue-500/20 to-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Gift,
      title: "Gift a Friend",
      description: "Send funds as a gift to someone special",
      color: "from-purple-500/20 to-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      icon: HeadphonesIcon,
      title: "Support",
      description: "Get help with your deposit process",
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

  const withdrawOptions = [
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

  const options = tab === "withdraw" ? withdrawOptions : depositOptions;
  const title = tab === "withdraw" ? "Withdrawal Options" : "Deposit Options";
  const subtitle =
    tab === "withdraw"
      ? "Choose how you want to withdraw your funds"
      : "Choose how you want to add funds to your account";

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
            {title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <Card
                  className={`bg-gradient-to-br ${option.color} border ${option.borderColor} hover:border-opacity-60 transition-all duration-300 h-full ${option.comingSoon ? "opacity-75" : ""}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${option.color} border ${option.borderColor}`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      {option.comingSoon && (
                        <span className="px-2 py-1 text-xs bg-gold/20 text-gold rounded-full border border-gold/30">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-white text-lg">
                      {option.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4">
                      {option.description}
                    </p>
                    <Button
                      className={`w-full bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/30 transition-all duration-300 ${option.comingSoon ? "cursor-not-allowed opacity-50" : ""}`}
                      disabled={option.comingSoon}
                    >
                      {option.comingSoon ? "Coming Soon" : "Select"}
                      {!option.comingSoon && (
                        <ArrowRight className="w-4 h-4 ml-2" />
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${option.color} rounded-lg blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
                />
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DepositPage;
