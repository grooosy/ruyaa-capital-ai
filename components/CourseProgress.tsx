"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Trophy, Target, TrendingUp, Calendar, CheckCircle, Play } from "lucide-react"

interface ProgressStats {
  totalCourses: number
  completedCourses: number
  totalHours: number
  completedHours: number
  currentStreak: number
  certificates: number
  nextMilestone: string
  weeklyGoal: number
  weeklyProgress: number
}

const stats: ProgressStats = {
  totalCourses: 6,
  completedCourses: 2,
  totalHours: 22,
  completedHours: 6,
  currentStreak: 7,
  certificates: 2,
  nextMilestone: "Complete AI Trading Strategies",
  weeklyGoal: 5,
  weeklyProgress: 3,
}

const recentActivity = [
  {
    id: "1",
    type: "completed",
    title: "Technical Analysis Fundamentals",
    time: "2 hours ago",
    points: 150,
  },
  {
    id: "2",
    type: "started",
    title: "AI Trading Strategies - Module 1",
    time: "1 day ago",
    points: 0,
  },
  {
    id: "3",
    type: "certificate",
    title: "Trading Fundamentals Certificate",
    time: "3 days ago",
    points: 500,
  },
]

const upcomingLessons = [
  {
    id: "1",
    title: "Machine Learning in Trading",
    duration: "25 min",
    difficulty: "Intermediate",
  },
  {
    id: "2",
    title: "Risk Assessment Algorithms",
    duration: "18 min",
    difficulty: "Advanced",
  },
  {
    id: "3",
    title: "Portfolio Optimization",
    duration: "32 min",
    difficulty: "Intermediate",
  },
]

export default function CourseProgress() {
  const overallProgress = (stats.completedCourses / stats.totalCourses) * 100
  const hoursProgress = (stats.completedHours / stats.totalHours) * 100
  const weeklyProgress = (stats.weeklyProgress / stats.weeklyGoal) * 100

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {stats.completedCourses}/{stats.totalCourses}
                </div>
                <div className="text-sm text-gray-400">Courses</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-lg">
                <Clock className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.completedHours}h</div>
                <div className="text-sm text-gray-400">Studied</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.currentStreak}</div>
                <div className="text-sm text-gray-400">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg">
                <Trophy className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.certificates}</div>
                <div className="text-sm text-gray-400">Certificates</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Overall Progress */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Course Completion</span>
                <span className="text-white">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Study Hours</span>
                <span className="text-white">{Math.round(hoursProgress)}%</span>
              </div>
              <Progress value={hoursProgress} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Weekly Goal</span>
                <span className="text-white">
                  {stats.weeklyProgress}/{stats.weeklyGoal} hours
                </span>
              </div>
              <Progress value={weeklyProgress} className="h-2" />
            </div>

            <div className="pt-4 border-t border-gray-800/50">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Target className="h-4 w-4" />
                Next Milestone
              </div>
              <p className="text-white font-medium">{stats.nextMilestone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-cyan-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "completed"
                        ? "bg-green-600/20 text-green-400"
                        : activity.type === "certificate"
                          ? "bg-yellow-600/20 text-yellow-400"
                          : "bg-blue-600/20 text-blue-400"
                    }`}
                  >
                    {activity.type === "completed" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : activity.type === "certificate" ? (
                      <Trophy className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{activity.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-400 text-xs">{activity.time}</span>
                      {activity.points > 0 && (
                        <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-xs">
                          +{activity.points} XP
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Lessons */}
      <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-400" />
            Continue Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-medium text-sm">{lesson.title}</h4>
                  <Badge
                    className={`text-xs ${
                      lesson.difficulty === "Advanced"
                        ? "bg-red-600/20 text-red-400 border-red-500/30"
                        : "bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
                    }`}
                  >
                    {lesson.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{lesson.duration}</span>
                  </div>

                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                    <Play className="mr-1 h-3 w-3" />
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
