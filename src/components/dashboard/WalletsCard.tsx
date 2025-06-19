"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Plus, Eye, EyeOff, TrendingUp, TrendingDown, Copy, Send, ArrowUpRight } from "lucide-react"
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
    {
      id: "4",
      name: "Savings Account",
      balance: 15420.0,
      currency: "USD",
      type: "savings",
      change24h: 0.1,
    },
  ]

  const formatBalance = (balance: number, currency: string) => {
    if (currency === "USD") {
      return `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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

  const totalBalance = wallets.reduce((sum, wallet) => {
    if (wallet.currency === "USD") {
      return sum + wallet.balance
    }
    // Convert crypto to USD (mock conversion rates)
    const conversionRates: { [key: string]: number } = {
      BTC: 45000,
      ETH: 2800,
    }
    return sum + wallet.balance * (conversionRates[wallet.currency] || 0)
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="h-full"
    >
      <Card className="bg-black/40 backdrop-blur-xl border-gray-800/50 h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-400" />
            Wallets & Balances
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowBalances(!showBalances)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
              <Plus className="w-4 h-4 mr-2" />
              Add Wallet
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Total Balance */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Portfolio Value</p>
                <p className="text-2xl font-bold text-white">
                  {showBalances ? `$${totalBalance.toLocaleString()}` : "••••••"}
                </p>
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+2.4%</span>
              </div>
            </div>
          </div>

          {/* Wallet List */}
          <div className="space-y-3">
            {wallets.map((wallet, index) => (
              <motion.div
                key={wallet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  selectedWallet === wallet.id
                    ? "bg-gray-800/50 border-blue-500/50"
                    : "bg-gray-900/30 border-gray-800/50 hover:bg-gray-800/30 hover:border-gray-700/50"
                }`}
                onClick={() => setSelectedWallet(selectedWallet === wallet.id ? null : wallet.id)}
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
                      {wallet.change24h >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>
                        {wallet.change24h >= 0 ? "+" : ""}
                        {wallet.change24h}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Wallet Actions */}
                {selectedWallet === wallet.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-800/50"
                  >
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                      >
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Receive
                      </Button>
                      {wallet.address && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(wallet.address!)
                          }}
                          className="text-gray-400 hover:text-white hover:bg-gray-800/50"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-800/50">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                <Plus className="w-4 h-4 mr-2" />
                Add Funds
              </Button>
              <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default WalletsCard
