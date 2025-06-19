"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Plus, Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface WalletData {
  id: string
  name: string
  balance: number
  currency: string
  type: "primary" | "crypto" | "savings"
  change24h: number
  address?: string
}

const WalletsCard = () => {
  const [showBalances, setShowBalances] = useState(true)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const wallets: WalletData[] = [
    {
      id: "1",
      name: "Trading Account",
      balance: 2450.75,
      currency: "USD",
      type: "primary",
      change24h: 5.2,
    },
    {
      id: "2",
      name: "Bitcoin Wallet",
      balance: 0.0234,
      currency: "BTC",
      type: "crypto",
      change24h: -2.1,
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    },
    {
      id: "3",
      name: "Ethereum Wallet",
      balance: 1.567,
      currency: "ETH",
      type: "crypto",
      change24h: 3.8,
      address: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
    },
  ]

  const formatBalance = (balance: number, currency: string) => {
    if (currency === "USD") {
      return `$${balance.toLocaleString()}`
    }
    return `${balance} ${currency}`
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getWalletTypeColor = (type: string) => {
    switch (type) {
      case "primary":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "crypto":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "savings":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-black/40 backdrop-blur-xl border-gray-800/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-400" />
            Wallets & Balances
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowBalances(!showBalances)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
              <Plus className="w-4 h-4 mr-2" />
              Add Wallet
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {wallets.map((wallet, index) => (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 rounded-lg bg-gray-900/30 border border-gray-800/50 hover:bg-gray-800/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{wallet.name}</h3>
                      <Badge className={`text-xs ${getWalletTypeColor(wallet.type)}`}>{wallet.type}</Badge>
                    </div>
                    {wallet.address && <p className="text-gray-400 text-sm">{formatAddress(wallet.address)}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">
                    {showBalances ? formatBalance(wallet.balance, wallet.currency) : "••••••"}
                  </p>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      wallet.change24h >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {wallet.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>
                      {wallet.change24h >= 0 ? "+" : ""}
                      {wallet.change24h}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default WalletsCard
