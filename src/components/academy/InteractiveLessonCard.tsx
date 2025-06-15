
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Play, ArrowRight, Brain, Zap, TrendingUp, Shield, Target, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface InteractiveLessonProps {
  lesson: any;
  isCompleted: boolean;
  onComplete: () => void;
}

const InteractiveLessonCard: React.FC<InteractiveLessonProps> = ({
  lesson,
  isCompleted,
  onComplete,
}) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!lesson.interactive_content) return null;

  const content = lesson.interactive_content;
  const steps = content.steps || content.concepts || content.strategies || content.points || [];

  const getIcon = () => {
    if (content.steps) return <Target className="w-6 h-6" />;
    if (content.concepts) return <Brain className="w-6 h-6" />;
    if (content.strategies) return <Zap className="w-6 h-6" />;
    return <Sparkles className="w-6 h-6" />;
  };

  const getGradient = () => {
    if (content.steps) return 'from-blue/20 to-green/20';
    if (content.concepts) return 'from-purple/20 to-gold/20';
    if (content.strategies) return 'from-green/20 to-blue/20';
    return 'from-gold/20 to-green/20';
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const renderContent = () => {
    const currentItem = steps[currentStep];
    
    if (content.realExample && currentStep === steps.length - 1) {
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green/10 to-gold/10 p-4 rounded-lg border border-green/20">
            <h4 className="text-green font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {isArabic ? 'مثال حقيقي' : 'Real Example'}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">{isArabic ? 'الزوج:' : 'Pair:'}</span>
                  <span className="text-white font-mono">{content.realExample.pair}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{isArabic ? 'الدخول:' : 'Entry:'}</span>
                  <span className="text-green font-mono">{content.realExample.entry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{isArabic ? 'وقف الخسارة:' : 'Stop Loss:'}</span>
                  <span className="text-red-400 font-mono">{content.realExample.stopLoss}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">{isArabic ? 'جني الأرباح:' : 'Take Profit:'}</span>
                  <span className="text-green font-mono">{content.realExample.takeProfit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{isArabic ? 'ثقة الذكاء الاصطناعي:' : 'AI Confidence:'}</span>
                  <Badge className="bg-green/20 text-green text-xs">{content.realExample.aiConfidence}</Badge>
                </div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-blue/10 rounded border border-blue/20">
              <p className="text-blue-300 text-xs">{content.realExample.reasoning}</p>
            </div>
          </div>
          <p className="text-gray-300">
            {isArabic ? 
              (content.stepsAr?.[currentStep] || content.conceptsAr?.[currentStep] || content.strategiesAr?.[currentStep]) :
              currentItem
            }
          </p>
        </div>
      );
    }

    if (content.scenarios && currentStep < content.scenarios.length) {
      return (
        <div className="space-y-3">
          <p className="text-gray-300">
            {isArabic ? 
              (content.conceptsAr?.[currentStep]) :
              steps[currentStep]
            }
          </p>
          <div className="bg-gold/10 p-3 rounded-lg border border-gold/20">
            <p className="text-gold text-sm font-mono">{content.scenarios[currentStep]}</p>
          </div>
        </div>
      );
    }

    return (
      <p className="text-gray-300">
        {isArabic ? 
          (content.stepsAr?.[currentStep] || content.conceptsAr?.[currentStep] || content.strategiesAr?.[currentStep]) :
          currentItem
        }
      </p>
    );
  };

  return (
    <Card className={`bg-gradient-to-br from-card via-card to-green/5 border-green/20 overflow-hidden`}>
      <CardContent className="p-0">
        <div className="relative">
          {/* Header with AI-themed animated background */}
          <div className={`bg-gradient-to-r ${getGradient()} p-6 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }} />
            </div>
            
            <div className="relative flex items-center gap-4">
              <motion.div
                className="p-3 bg-green/20 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {getIcon()}
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {isArabic ? lesson.title_ar : lesson.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {isArabic ? lesson.description_ar : lesson.description}
                </p>
                
                {/* AI-powered badge */}
                <div className="mt-2">
                  <Badge className="bg-gradient-to-r from-blue/20 to-purple/20 text-blue-300 border-blue/30">
                    <Brain className="w-3 h-3 mr-1" />
                    {isArabic ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered'}
                  </Badge>
                </div>
              </div>

              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-2 bg-green/20 rounded-full"
                >
                  <CheckCircle className="w-6 h-6 text-green" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Interactive Content */}
          <div className="p-6">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full mb-4 bg-green/10 hover:bg-green/20 border border-green/30 text-green"
              disabled={isCompleted}
            >
              {isExpanded ? 
                (isArabic ? 'إخفاء المحتوى' : 'Hide Content') : 
                (isArabic ? 'ابدأ التعلم التفاعلي' : 'Start Interactive Learning')
              }
              <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </Button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Progress indicator */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">
                      {isArabic ? 'التقدم' : 'Progress'}: {currentStep + 1}/{steps.length}
                    </span>
                    <div className="flex gap-1">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index <= currentStep ? 'bg-green' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content display */}
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-green/5 to-gold/5 p-4 rounded-lg border border-green/20"
                  >
                    {renderContent()}
                  </motion.div>

                  {/* AI Tips Section */}
                  {content.aiTips && currentStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-blue/10 to-purple/10 p-4 rounded-lg border border-blue/20"
                    >
                      <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        {isArabic ? 'نصائح الذكاء الاصطناعي' : 'AI Tips'}
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {(isArabic ? content.aiTipsAr : content.aiTips).map((tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Navigation */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      variant="outline"
                      size="sm"
                      className="border-green/30 text-green hover:bg-green/10"
                    >
                      {isArabic ? 'السابق' : 'Previous'}
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      className="flex-1 bg-gradient-to-r from-green to-blue hover:from-green/90 hover:to-blue/90"
                    >
                      {currentStep === steps.length - 1 ? 
                        (isArabic ? '✓ إكمال الدرس' : '✓ Complete Lesson') :
                        (isArabic ? 'التالي' : 'Next')
                      }
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveLessonCard;
