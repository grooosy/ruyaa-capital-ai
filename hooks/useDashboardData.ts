"use client"

import { useState, useEffect } from "react"

export interface DashboardStats {
  totalBalance: number
  totalProfit: number
  profitChange: number
  activeStrategies: number
  successRate: number
  monthlyReturn: number
}

export interface RecentActivity {
  id: string
  type: "trade" | "deposit" | "withdrawal" | "profit"
  description: string
  amount: number
  currency: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

export interface PortfolioData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    totalProfit: 0,
    profitChange: 0,
    activeStrategies: 0,
    successRate: 0,
    monthlyReturn: 0,
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)

      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockStats: DashboardStats = {
        totalBalance: 125420.5,
        totalProfit: 23847.32,
        profitChange: 12.5,
        activeStrategies: 8,
        successRate: 87.3,
        monthlyReturn: 15.2,
      }

      const mockActivity: RecentActivity[] = [
        {
          id: "1",
          type: "profit",
          description: "AI Strategy Alpha generated profit",
          amount: 1247.5,
          currency: "USD",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          status: "completed",
        },
        {
          id: "2",
          type: "trade",
          description: "BTC/USDT arbitrage executed",
          amount: 0.0234,
          currency: "BTC",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          status: "completed",
        },
        {
          id: "3",
          type: "deposit",
          description: "Wallet deposit received",
          amount: 5000.0,
          currency: "USD",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          status: "completed",
        },
        {
          id: "4",
          type: "trade",
          description: "ETH/USDT position opened",
          amount: 2.5,
          currency: "ETH",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          status: "pending",
        },
      ]

      const mockPortfolioData: PortfolioData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Portfolio Value",
            data: [85000, 92000, 88000, 105000, 118000, 125420],
            borderColor: "#FFD700",
            backgroundColor: "rgba(255, 215, 0, 0.1)",
          },
          {
            label: "Profit",
            data: [2000, 7000, 3000, 20000, 33000, 23847],
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
          },
        ],
      }

      setStats(mockStats)
      setRecentActivity(mockActivity)
      setPortfolioData(mockPortfolioData)
      setError(null)
    } catch (err) {
      setError("Failed to fetch dashboard data")
      console.error("Dashboard data fetch error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const refreshData = async () => {
    await fetchDashboardData()
  }

  return {
    stats,
    recentActivity,
    portfolioData,
    isLoading,
    error,
    refreshData,
  }
}

// Additional hooks for specific dashboard sections
export function usePortfolioPerformance() {
  const [performanceData, setPerformanceData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPerformanceData = async () => {
      // Mock performance data
      const mockData = {
        daily: { return: 2.3, benchmark: 1.1 },
        weekly: { return: 8.7, benchmark: 3.2 },
        monthly: { return: 15.2, benchmark: 7.8 },
        yearly: { return: 127.5, benchmark: 45.2 },
      }

      setPerformanceData(mockData)
      setIsLoading(false)
    }

    fetchPerformanceData()
  }, [])

  return { performanceData, isLoading }
}

export function useActiveStrategies() {
  const [strategies, setStrategies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStrategies = async () => {
      const mockStrategies = [
        {
          id: "1",
          name: "AI Alpha Strategy",
          status: "active",
          profit: 12847.32,
          profitPercent: 23.5,
          risk: "medium",
        },
        {
          id: "2",
          name: "Crypto Arbitrage Bot",
          status: "active",
          profit: 8234.12,
          profitPercent: 18.2,
          risk: "low",
        },
        {
          id: "3",
          name: "DeFi Yield Optimizer",
          status: "paused",
          profit: 2766.88,
          profitPercent: 7.8,
          risk: "high",
        },
      ]

      setStrategies(mockStrategies)
      setIsLoading(false)
    }

    fetchStrategies()
  }, [])

  return { strategies, isLoading }
}
