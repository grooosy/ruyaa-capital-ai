"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Globe, Clock, MapPin, Shield, AlertTriangle } from "lucide-react"

interface Session {
  id: string
  device: string
  browser: string
  location: string
  ip: string
  lastActive: string
  isCurrent: boolean
  isSecure: boolean
}

interface SessionsCardProps {
  sessions?: Session[]
}

export default function SessionsCard({ sessions }: SessionsCardProps) {
  const defaultSessions: Session[] = [
    {
      id: "1",
      device: "Desktop",
      browser: "Chrome 120.0",
      location: "New York, USA",
      ip: "192.168.1.100",
      lastActive: "2024-01-19T10:30:00Z",
      isCurrent: true,
      isSecure: true,
    },
    {
      id: "2",
      device: "Mobile",
      browser: "Safari 17.2",
      location: "New York, USA",
      ip: "192.168.1.101",
      lastActive: "2024-01-19T08:15:00Z",
      isCurrent: false,
      isSecure: true,
    },
    {
      id: "3",
      device: "Tablet",
      browser: "Firefox 121.0",
      location: "Los Angeles, USA",
      ip: "203.0.113.45",
      lastActive: "2024-01-18T22:45:00Z",
      isCurrent: false,
      isSecure: false,
    },
  ]

  const sessionData = sessions || defaultSessions

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "tablet":
        return <Smartphone className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const handleRevokeSession = (sessionId: string) => {
    console.log("Revoking session:", sessionId)
    // Implement session revocation logic
  }

  return (
    <Card className="bg-black/40 backdrop-blur-xl border-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Active Sessions
          </CardTitle>
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{sessionData.length} Active</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {sessionData.map((session) => (
          <div
            key={session.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              session.isCurrent
                ? "bg-blue-500/10 border-blue-500/30"
                : "bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    session.isCurrent ? "bg-blue-500/20 text-blue-400" : "bg-gray-700/50 text-gray-400"
                  }`}
                >
                  {getDeviceIcon(session.device)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-medium">{session.device}</h4>
                    {session.isCurrent && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">Current</Badge>
                    )}
                    {!session.isSecure && (
                      <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Unsecure
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      <span>{session.browser}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>Last active {formatLastActive(session.lastActive)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {session.isSecure ? (
                  <Shield className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}

                {!session.isCurrent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            </div>

            {/* IP Address */}
            <div className="mt-3 pt-3 border-t border-gray-700/30">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>IP: {session.ip}</span>
                <span className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${session.isSecure ? "bg-green-400" : "bg-red-400"}`}></div>
                  {session.isSecure ? "Secure Connection" : "Unsecure Connection"}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="text-yellow-300 font-medium">Security Tip</h4>
              <p className="text-yellow-200/80 text-sm mt-1">
                Always log out from public devices and revoke suspicious sessions immediately.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
