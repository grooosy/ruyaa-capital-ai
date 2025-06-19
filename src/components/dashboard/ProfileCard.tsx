"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Edit, Mail, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface ProfileCardProps {
  user: {
    name?: string
    email?: string
    avatar?: string
    joinDate?: string
  }
  onEdit: () => void
}

const ProfileCard = ({ user, onEdit }: ProfileCardProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <Button onClick={onEdit} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green/10 border border-green/20 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-green" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{user.name || "User"}</h3>
              <p className="text-gray-400">Premium Member</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{user.email || "No email provided"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Joined {user.joinDate || "Recently"}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green">12</div>
                <div className="text-xs text-gray-400">Active Trades</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold">$2,450</div>
                <div className="text-xs text-gray-400">Total Profit</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">87%</div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ProfileCard
