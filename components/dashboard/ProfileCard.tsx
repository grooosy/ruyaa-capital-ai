"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Mail, Phone, MapPin, Calendar, Star, TrendingUp } from "lucide-react"

interface ProfileCardProps {
  user?: {
    id: string
    name: string
    email: string
    avatar?: string
    phone?: string
    location?: string
    joinDate: string
    tier: "Basic" | "Pro" | "Premium"
    totalProfit: number
    successRate: number
    activeStrategies: number
  }
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  const defaultUser = {
    id: "1",
    name: "Alex Thompson",
    email: "alex@ruyaa.ai",
    avatar: "/placeholder-user.jpg",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    joinDate: "2024-01-15",
    tier: "Pro" as const,
    totalProfit: 15420.5,
    successRate: 87.5,
    activeStrategies: 12,
  }

  const profile = user || defaultUser

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Basic":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      case "Pro":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Premium":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <Card className="bg-black/40 backdrop-blur-xl border-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Profile Overview
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16 border-2 border-blue-500/30">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="bg-gray-800 text-white">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black"></div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{profile.name}</h3>
            <p className="text-gray-400">{profile.email}</p>
            <Badge className={`mt-1 ${getTierColor(profile.tier)}`}>
              <Star className="w-3 h-3 mr-1" />
              {profile.tier} Member
            </Badge>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{profile.email}</span>
          </div>
          {profile.phone && (
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-4 h-4 text-green-400" />
              <span className="text-sm">{profile.phone}</span>
            </div>
          )}
          {profile.location && (
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-4 h-4 text-red-400" />
              <span className="text-sm">{profile.location}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-gray-300">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-sm">Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">${profile.totalProfit.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Total Profit</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 flex items-center justify-center gap-1">
              {profile.successRate}%
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{profile.activeStrategies}</div>
            <div className="text-xs text-gray-400">Active Strategies</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0">
            Edit Profile
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:text-white"
          >
            View Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
