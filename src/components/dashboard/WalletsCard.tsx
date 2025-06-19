"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Plus, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const WalletsCard = () => {
  const [showBalances, setShowBalances] = useState(true)

  const wallets = [
    {
      id: "1",
      name: "Trading Account",
      balance: 2450.75,
      currency: "USD",
      type: "primary",
    },
    {
      id: "2",
      name: "Bitcoin Wallet",
      balance: 0.0234,
      currency: "BTC",
      type: "crypto",
    },
    {
      id: "3",
      name: "Ethereum Wallet",
      balance: 1.567,
      currency: "ETH",
      type: "crypto",
    },
  ]

  const formatBalance = (balance: number, currency: string) => {
    if (currency === "USD") {
      return `$${balance.toLocaleString()}`
    }
    return `${balance} ${currency}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallets & Balances
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowBalances(!showBalances)}
              variant="ghost"
              size="sm"
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />\
