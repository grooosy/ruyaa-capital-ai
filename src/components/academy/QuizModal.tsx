
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Trophy, Brain, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getQuizData } from '@/utils/videoUtils';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
  quizNumber: number;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onComplete, quizNumber }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const quizData = getQuizData(quizNumber);
  const score = selectedAnswers.reduce((acc, answer, index) => {
    return acc + (answer === quizData.questions[index].correct ? 1 : 0);
  }, 0);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleFinish = () => {
    onComplete(score);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage >= 80) return 'text-green';
    if (percentage >= 60) return 'text-gold';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage >= 80) {
      return isArabic ? '🎉 ممتاز! أنت تتقن المادة!' : '🎉 Excellent! You mastered the material!';
    }
    if (percentage >= 60) {
      return isArabic ? '👍 جيد! راجع بعض النقاط وحاول مرة أخرى' : '👍 Good! Review some points and try again';
    }
    return isArabic ? '📚 تحتاج لمراجعة أكثر. لا تستسلم!' : '📚 Need more review. Don\'t give up!';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-green/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <motion.div
              className="p-2 bg-green/20 rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Brain className="w-6 h-6 text-green" />
            </motion.div>
            <span className="text-white">
              {isArabic ? quizData.titleAr : quizData.title}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!showResults ? (
            <>
              {/* Progress */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {isArabic ? 'السؤال' : 'Question'} {currentQuestion + 1} {isArabic ? 'من' : 'of'} {quizData.questions.length}
                </span>
                <div className="flex gap-1">
                  {quizData.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index < currentQuestion ? 'bg-green' :
                        index === currentQuestion ? 'bg-gold' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-r from-green/5 to-gold/5 border-green/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        {isArabic ? 
                          quizData.questions[currentQuestion].questionAr : 
                          quizData.questions[currentQuestion].question
                        }
                      </h3>

                      <div className="space-y-3">
                        {quizData.questions[currentQuestion].options.map((option, index) => {
                          const optionText = isArabic ? 
                            quizData.questions[currentQuestion].optionsAr[index] : 
                            option;
                          
                          return (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswerSelect(index)}
                              className={`w-full p-4 text-left rounded-lg border transition-all ${
                                selectedAnswers[currentQuestion] === index
                                  ? 'border-green bg-green/10 text-green'
                                  : 'border-gray-600 hover:border-green/50 text-gray-300 hover:bg-green/5'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  selectedAnswers[currentQuestion] === index
                                    ? 'border-green bg-green'
                                    : 'border-gray-600'
                                }`}>
                                  {selectedAnswers[currentQuestion] === index && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                                <span>{optionText}</span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="border-green/30 text-green hover:bg-green/10"
                >
                  {isArabic ? 'السابق' : 'Previous'}
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="flex-1 bg-green hover:bg-green/90"
                >
                  {currentQuestion === quizData.questions.length - 1 ? 
                    (isArabic ? 'إنهاء الاختبار' : 'Finish Quiz') :
                    (isArabic ? 'التالي' : 'Next')
                  }
                </Button>
              </div>
            </>
          ) : (
            /* Results */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="p-4 bg-green/20 rounded-full"
                >
                  <Trophy className="w-12 h-12 text-gold" />
                </motion.div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isArabic ? 'انتهيت من الاختبار!' : 'Quiz Complete!'}
                </h3>
                <p className="text-gray-300">{getScoreMessage()}</p>
              </div>

              <Card className="bg-gradient-to-r from-green/10 to-gold/10 border-green/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
                      {score}/{quizData.questions.length}
                    </div>
                    <Badge variant="outline" className="border-green/30 text-green">
                      {Math.round((score / quizData.questions.length) * 100)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 border-green/30 text-green hover:bg-green/10"
                >
                  {isArabic ? 'إعادة المحاولة' : 'Try Again'}
                </Button>
                <Button
                  onClick={handleFinish}
                  className="flex-1 bg-green hover:bg-green/90"
                >
                  {isArabic ? 'متابعة' : 'Continue'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
