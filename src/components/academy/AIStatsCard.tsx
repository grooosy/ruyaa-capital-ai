
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Shield, Zap, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AIStatsCard: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const stats = [
    {
      icon: <Brain className="w-5 h-5" />,
      value: '85%+',
      label: isArabic ? 'دقة الإشارات' : 'Signal Accuracy',
      labelAr: 'دقة الإشارات',
      color: 'text-blue-400'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      value: '24/7',
      label: isArabic ? 'تحليل السوق' : 'Market Analysis',
      labelAr: 'تحليل السوق',
      color: 'text-green'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      value: '2%',
      label: isArabic ? 'حد المخاطر' : 'Risk Limit',
      labelAr: 'حد المخاطر',
      color: 'text-gold'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      value: '<1s',
      label: isArabic ? 'سرعة الإشارة' : 'Signal Speed',
      labelAr: 'سرعة الإشارة',
      color: 'text-purple-400'
    }
  ];

  const features = [
    {
      title: isArabic ? 'تحليل المشاعر الفوري' : 'Real-time Sentiment Analysis',
      description: isArabic ? 'يحلل ذكاء رؤيا مشاعر السوق من آلاف المصادر' : 'Ruyaa AI analyzes market sentiment from thousands of sources'
    },
    {
      title: isArabic ? 'إدارة المخاطر الذكية' : 'Smart Risk Management',
      description: isArabic ? 'حماية تلقائية لرأس المال مع تحديد الأحجام المثلى' : 'Automatic capital protection with optimal position sizing'
    },
    {
      title: isArabic ? 'إشارات شخصية' : 'Personalized Signals',
      description: isArabic ? 'توصيات مخصصة بناءً على ملف المخاطر الخاص بك' : 'Customized recommendations based on your risk profile'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-card to-blue/5 border-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <motion.div
            className="p-2 bg-blue/20 rounded-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Brain className="w-6 h-6 text-blue-400" />
          </motion.div>
          {isArabic ? 'قوة الذكاء الاصطناعي في رؤيا' : 'Ruyaa AI Power'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-green/5 to-blue/5 p-3 rounded-lg border border-green/20 text-center"
            >
              <div className={`${stat.color} mb-1`}>
                {stat.icon}
              </div>
              <div className={`text-xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">
                {isArabic ? stat.labelAr : stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-blue-300 flex items-center gap-2">
            <Target className="w-4 h-4" />
            {isArabic ? 'المزايا الحصرية' : 'Exclusive Features'}
          </h4>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-blue/10 to-purple/10 p-3 rounded-lg border border-blue/20"
            >
              <h5 className="text-sm font-medium text-white mb-1">
                {feature.title}
              </h5>
              <p className="text-xs text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Success Badge */}
        <div className="text-center">
          <Badge className="bg-gradient-to-r from-green/20 to-gold/20 text-green border-green/30">
            <Users className="w-3 h-3 mr-1" />
            {isArabic ? '10,000+ متداول يثق برؤيا' : '10,000+ Traders Trust Ruyaa'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIStatsCard;
