"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"

interface CourseProgressProps {
  completedLessons: number
  totalLessons: number
  progressPercentage: number
}

const CourseProgress = ({ completedLessons, totalLessons, progressPercentage }: CourseProgressProps) => {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === "ar"

  return (
    <Card className="bg-card border-green/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green" />
          {isArabic ? "تقدم الدورة" : "Course Progress"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">{isArabic ? "الدروس المكتملة" : "Lessons Completed"}</span>
          <span className="text-green font-semibold">
            {completedLessons}/{totalLessons}
          </span>
        </div>

        <Progress value={progressPercentage} className="h-2" />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              {Math.round(progressPercentage)}% {isArabic ? "مكتمل" : "Complete"}
            </span>
          </div>
          {progressPercentage === 100 && (
            <span className="text-gold font-semibold">{isArabic ? "🎉 تم الإنجاز!" : "🎉 Completed!"}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseProgress
