"use client"

import { motion } from "framer-motion"
import { Clock, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import type { Tables } from "@/integrations/supabase/types"

type Course = Tables<"video_courses">
type Lesson = Tables<"video_lessons">

interface AcademyHeroProps {
  currentCourse: Course | undefined
  lessons: Lesson[] | undefined
}

const AcademyHero = ({ currentCourse, lessons }: AcademyHeroProps) => {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === "ar"

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge className="mb-4 bg-green/10 text-green border-green/20">
            {isArabic ? "دورة تداول مجانية" : "Free Trading Course"}
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            {isArabic ? "أكاديمية" : "RuyaaCapital"}{" "}
            <span className="text-gold">{isArabic ? "رؤيا كابيتال" : "Academy"}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {currentCourse
              ? isArabic
                ? currentCourse.description_ar
                : currentCourse.description
              : isArabic
                ? "أتقن تداول MT4/MT5 مع دورتنا الشاملة. تعلم من خبراء الصناعة وابدأ التداول بثقة باستخدام منصة رؤيا المدعومة بالذكاء الاصطناعي."
                : "Master MT4/MT5 trading with our comprehensive video course. Learn from industry experts and start trading with confidence using Ruyaa's AI-powered platform."}
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {lessons ? `${lessons.length} ${isArabic ? "دروس" : "Lessons"}` : "5 Lessons"} •
                {currentCourse
                  ? ` ${Math.round(currentCourse.total_duration_minutes / 60)} ${isArabic ? "ساعات" : "Hours"}`
                  : " 2 Hours Total"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{isArabic ? "2,500+ طالب" : "2,500+ Students"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gold fill-current" />
              <span>{isArabic ? "تقييم 4.9/5" : "4.9/5 Rating"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AcademyHero
