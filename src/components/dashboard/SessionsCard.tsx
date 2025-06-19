"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Monitor } from "lucide-react"
import { motion } from "framer-motion"

const SessionsCard = () => {
  const sessions = [
    {
      id: "1",
      device: "Chrome on Windows",
      location: "Dubai, UAE",
      lastActive: "2 minutes ago",
      current: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "Dubai, UAE",
      lastActive: "1 hour ago",
      current: false,
    },
    {
      id: "3",
      device: "Chrome on Android",
      location: "Abu Dhabi, UAE",
      lastActive: "2 days ago",
      current: false,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Active Sessions
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                session.current ? "border-green bg-green/5" : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-medium">{session.device}</span>
                    {session.current && (
                      <span className="px-2 py-1 bg-green/20 text-green text-xs rounded-full">Current</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {session.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.lastActive}
                    </div>
                  </div>
                </div>

                {!session.current && <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default SessionsCard
