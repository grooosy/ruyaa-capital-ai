"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Plus, Eye, EyeOff, TrendingUp, TrendingDown, Copy, ExternalLink } from "lucide-react"

interface WalletData {
  id: string
  name: string
  type: "crypto" | "fiat" | "trading"
  balance: number
  currency: string
  change24h: number
  isConnected: boolean
  address?: string
  icon: string
}

interface WalletsCardProps {
  wallets?: WalletData[]
}

export default function WalletsCard({ wallets }: WalletsCardProps) {
  const [showBalances, setShowBalances] = useState(true)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const defaultWallets: WalletData[] = [
    {
      id: "1",
      name: "Main Trading Account",
      type: "trading",
      balance: 25420.5,
      currency: "USD",
      change24h: 3.2,
      isConnected: true,
      icon: "💰",
    },
    {
      id: "2",
      name: "Bitcoin Wallet",
      type: "crypto",
      balance: 0.5847,
      currency: "BTC",
      change24h: -1.8,
      isConnected: true,
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      icon: "₿",
    },
    {
      id: "3",
      name: "Ethereum Wallet",
      type: "crypto",
      balance: 12.3456,
      currency: "ETH",
      change24h: 5.7,
      isConnected: true,
      address: "0x742d35Cc6634C0532925a3b8D4C0C8b3C2b5D8E8",
      icon: "Ξ",
    },
    {
      id: "4",
      name: "USDT Reserve",
      type: "crypto",
      balance: 5000.0,
      currency: "USDT",
      change24h: 0.1,
      isConnected: false,
      address: "0x742d35Cc6634C0532925a3b8D4C0C8b3C2b5D8E8",
      icon: "₮",
    },
  ]

  const walletData = wallets || defaultWallets
  const totalValue = walletData.reduce((sum, wallet) => {
    // Convert to USD for total (simplified conversion)
    const usdValue =
      wallet.currency === "USD"
        ? wallet.balance
        : wallet.currency === "BTC"
          ? wallet.balance * 45000
          : wallet.currency === "ETH"
            ? wallet.balance * 2500
            : wallet.balance // USDT assumed 1:1
    return sum + usdValue
  }, 0)

  const formatBalance = (balance: number, currency: string) => {
    if (!showBalances) return "••••••"

    if (currency === "USD" || currency === "USDT") {
      return `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    return `${balance.toFixed(4)} ${currency}`
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    // Show toast notification
  }

  const getWalletTypeColor = (type: string) => {
    switch (type) {
      case "trading":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "crypto":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "fiat":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <Card className="bg-black/40 backdrop-blur-xl border-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-400" />
            Wallets & Accounts
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalances(!showBalances)}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800/50">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Total Portfolio Value */}
        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {showBalances ? `$${totalValue.toLocaleString()}` : "••••••••"}
            </div>
            <div className="text-sm text-gray-400">Total Portfolio Value</div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">+12.5% (24h)</span>
            </div>
          </div>
        </div>

        {/* Wallets List */}
        <div className="space-y-3">
          {walletData.map((wallet) => (
            <div
              key={wallet.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedWallet === wallet.id
                  ? "bg-blue-500/10 border-blue-500/30"
                  : "bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50"
              }`}
              onClick={() => setSelectedWallet(selectedWallet === wallet.id ? null : wallet.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{wallet.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-medium">{wallet.name}</h4>
                      <Badge className={getWalletTypeColor(wallet.type)}>{wallet.type}</Badge>
                    </div>
                    <div className="text-lg font-bold text-white mt-1">
                      {formatBalance(wallet.balance, wallet.currency)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`flex items-center gap-1 ${wallet.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {wallet.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm">
                      {wallet.change24h >= 0 ? "+" : ""}
                      {wallet.change24h}%
                    </span>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${wallet.isConnected ? "bg-green-400" : "bg-red-400"}`}
                  ></div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedWallet === wallet.id && (
                <div className="mt-4 pt-4 border-t border-gray-700/30 space-y-3">
                  {wallet.address && (
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Address</div>
                      <div className="flex items-center gap-2 p-2 bg-black/30 rounded text-xs text-gray-300 font-mono">
                        <span className="flex-1 truncate">{wallet.address}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyAddress(wallet.address!)
                          }}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Send
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800/50"
                    >
                      Receive
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800/50"
                    >
                      History
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Wallet Button */}
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
          <Plus className="w-4 h-4 mr-2" />
          Connect New Wallet
        </Button>
      </CardContent>
    </Card>
  )
}
