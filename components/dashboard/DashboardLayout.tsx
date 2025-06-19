"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  TrendingUp,
  Bot,
  GraduationCap,
  Wallet,
  Settings,
  User,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab?: string
  onTabChange?: (tab: string) => void
}

const navigationItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "trading", label: "Trading", icon: TrendingUp },
  { id: "agents", label: "AI Agents", icon: Bot },
  { id: "academy", label: "Academy", icon: GraduationCap },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function DashboardLayout({ children, activeTab = "overview", onTabChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-black/40 border-r border-gray-800 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-semibold text-lg">Ruyaa AI</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    onTabChange?.(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full justify-start space-x-3 h-12 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-2 border-blue-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </nav>
        </ScrollArea>

        {/* User section */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-gray-400 truncate">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-black/40 border-b border-gray-800 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </Button>

              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
