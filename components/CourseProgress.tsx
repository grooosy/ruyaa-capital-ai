"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock, Target, TrendingUp } from "lucide-react"

interface CourseStats {
  totalCourses: number
  completedCourses: number
  totalHours: number
  completedHours: number
  currentStreak: number
  totalPoints: number
}

const stats: CourseStats = {
  totalCourses: 12,
  completedCourses: 4,
  totalHours: 48,
  completedHours: 16,
  currentStreak: 7,
  totalPoints: 2450,
}

const recentActivity = [
  { id: "1", title: "Completed: AI Trading Fundamentals", type: "completion", date: "2 hours ago", points: 250 },
  { id: "2", title: "Quiz Passed: Market Analysis", type: "quiz", date: "1 day ago", points: 100 },
  { id: "3", title: "Started: Advanced Arbitrage", type: "start", date: "2 days ago", points: 0 },
  { id: "4", title: "Achievement: 7-day Streak", type: "achievement", date: "3 days ago", points: 150 },
]

export default function CourseProgress() {
  const overallProgress = (stats.completedCourses / stats.totalCourses) * 100
  const hoursProgress = (stats.completedHours / stats.totalHours) * 100

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg">
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {stats.completedCourses}/{stats.totalCourses}
                </div>
                <div className="text-sm text-gray-400">Courses</div>
              </div>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <div className="text-xs text-gray-400 mt-2">{overallProgress.toFixed(0)}% Complete</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-lg">
                <Clock className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.completedHours}h</div>
                <div className="text-sm text-gray-400">Learning Time</div>
              </div>
            </div>
            <Progress value={hoursProgress} className="h-2" />
            <div className="text-xs text-gray-400 mt-2">{stats.totalHours - stats.completedHours}h remaining</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.currentStreak}</div>
                <div className="text-sm text-gray-400">Day Streak</div>
              </div>
            </div>
            <Badge className="bg-orange-600/20 text-orange-400 border-orange-500/30 text-xs">🔥 On Fire!</Badge>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.totalPoints.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Points</div>
              </div>
            </div>
            <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30 text-xs">Level 5</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Learning Path */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white">Learning Path Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Trading Fundamentals</span>
                <Badge className="bg-green-600/20 text-green-400 border-green-500/30">Complete</Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">AI Trading Concepts</span>
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">75%</Badge>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Advanced Arbitrage</span>
                <Badge className="bg-gray-600/20 text-gray-400 border-gray-500/30">25%</Badge>
              </div>
              <Progress value={25} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Risk Management</span>
                <Badge className="bg-gray-600/20 text-gray-400 border-gray-500/30">Locked</Badge>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "completion"
                        ? "bg-green-500"
                        : activity.type === "quiz"
                          ? "bg-blue-500"
                          : activity.type === "achievement"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{activity.title}</div>
                    <div className="text-gray-400 text-xs">{activity.date}</div>
                  </div>
                  {activity.points > 0 && (
                    <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30 text-xs">
                      +{activity.points}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
