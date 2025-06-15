
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Play, ArrowRight, Lightbulb, Target, TrendingUp } from 'lucide-react';
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
  const steps = content.points || content.terms || content.concepts || content.steps || [];

  const getIcon = () => {
    if (content.points) return <Lightbulb className="w-6 h-6" />;
    if (content.terms) return <Target className="w-6 h-6" />;
    if (content.concepts) return <TrendingUp className="w-6 h-6" />;
    return <Play className="w-6 h-6" />;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card to-green/5 border-green/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Header with animated background */}
          <div className="bg-gradient-to-r from-green/20 to-gold/20 p-6 relative overflow-hidden">
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
                (isArabic ? 'عرض المحتوى التفاعلي' : 'Show Interactive Content')
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
                    {content.terms ? (
                      <div>
                        <Badge className="mb-2 bg-gold/20 text-gold">{content.terms[currentStep].term}</Badge>
                        <p className="text-gray-300">
                          {isArabic ? content.terms[currentStep].definitionAr : content.terms[currentStep].definition}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-300">
                        {isArabic ? 
                          (content.pointsAr?.[currentStep] || content.conceptsAr?.[currentStep] || content.stepsAr?.[currentStep]) :
                          steps[currentStep]
                        }
                      </p>
                    )}
                  </motion.div>

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
                      className="flex-1 bg-green hover:bg-green/90"
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
