
export const getYouTubeVideoId = (url: string): string | null => {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]*)/,
    /youtube\.com\/v\/([^#&?]*)/,
    /youtube\.com\/user\/[^\/]*#p\/a\/u\/\d*\/([^&?]*)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }
  return null;
};

export const isValidVideoUrl = (url: string): boolean => {
  // Check for video file extensions or YouTube URLs
  return /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i.test(url) || getYouTubeVideoId(url) !== null;
};

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Modern interactive lesson content - using the working video and creating engaging short lessons
export const getModernLessonContent = (lessonIndex: number) => {
  const lessons = [
    // Lesson 1-5: Trading Fundamentals
    {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=p7HKvqRI_Bo',
      title: 'What is Trading?',
      titleAr: 'ما هو التداول؟',
      description: 'Introduction to financial markets and trading basics',
      descriptionAr: 'مقدمة في الأسواق المالية وأساسيات التداول'
    },
    {
      type: 'interactive',
      title: 'Market Types',
      titleAr: 'أنواع الأسواق',
      description: 'Understanding different financial markets',
      descriptionAr: 'فهم الأسواق المالية المختلفة',
      content: {
        points: [
          'Stock Markets - Buy ownership in companies',
          'Forex Markets - Currency exchange',
          'Crypto Markets - Digital currencies',
          'Commodity Markets - Raw materials'
        ],
        pointsAr: [
          'أسواق الأسهم - شراء ملكية في الشركات',
          'أسواق الفوركس - تبادل العملات',
          'أسواق العملات المشفرة - العملات الرقمية',
          'أسواق السلع - المواد الخام'
        ]
      }
    },
    {
      type: 'interactive',
      title: 'Key Trading Terms',
      titleAr: 'مصطلحات التداول الأساسية',
      description: 'Essential vocabulary for traders',
      descriptionAr: 'المفردات الأساسية للمتداولين',
      content: {
        terms: [
          { term: 'Bull Market', definition: 'Rising market prices', definitionAr: 'أسعار السوق المرتفعة' },
          { term: 'Bear Market', definition: 'Falling market prices', definitionAr: 'أسعار السوق المنخفضة' },
          { term: 'Volume', definition: 'Number of shares traded', definitionAr: 'عدد الأسهم المتداولة' },
          { term: 'Volatility', definition: 'Price movement intensity', definitionAr: 'كثافة حركة الأسعار' }
        ]
      }
    },
    {
      type: 'interactive',
      title: 'Risk vs Reward',
      titleAr: 'المخاطر مقابل العائد',
      description: 'Understanding the fundamental trading principle',
      descriptionAr: 'فهم مبدأ التداول الأساسي',
      content: {
        concepts: [
          'Higher potential returns often mean higher risk',
          'Diversification helps manage risk',
          'Never invest more than you can afford to lose',
          'Risk management is key to long-term success'
        ],
        conceptsAr: [
          'العوائد المحتملة الأعلى تعني عادة مخاطر أعلى',
          'التنويع يساعد في إدارة المخاطر',
          'لا تستثمر أكثر مما يمكنك تحمل خسارته',
          'إدارة المخاطر هي مفتاح النجاح طويل المدى'
        ]
      }
    },
    {
      type: 'interactive',
      title: 'Getting Started',
      titleAr: 'البدء',
      description: 'Your first steps in trading',
      descriptionAr: 'خطواتك الأولى في التداول',
      content: {
        steps: [
          'Choose a reputable broker',
          'Start with a demo account',
          'Learn basic analysis',
          'Start small with real money'
        ],
        stepsAr: [
          'اختر وسيطًا موثوقًا',
          'ابدأ بحساب تجريبي',
          'تعلم التحليل الأساسي',
          'ابدأ بمبلغ صغير بالمال الحقيقي'
        ]
      }
    }
  ];

  return lessons[lessonIndex % lessons.length];
};

// Quiz data for after every 5 lessons
export const getQuizData = (quizNumber: number) => {
  const quizzes = [
    {
      title: 'Trading Fundamentals Quiz',
      titleAr: 'اختبار أساسيات التداول',
      questions: [
        {
          question: 'What is a bull market?',
          questionAr: 'ما هو السوق الصاعد؟',
          options: ['Rising prices', 'Falling prices', 'Stable prices', 'Volatile prices'],
          optionsAr: ['أسعار مرتفعة', 'أسعار منخفضة', 'أسعار مستقرة', 'أسعار متقلبة'],
          correct: 0
        },
        {
          question: 'What does diversification help with?',
          questionAr: 'ما الذي يساعد فيه التنويع؟',
          options: ['Increasing profits', 'Managing risk', 'Faster trading', 'Lower fees'],
          optionsAr: ['زيادة الأرباح', 'إدارة المخاطر', 'التداول السريع', 'رسوم أقل'],
          correct: 1
        },
        {
          question: 'What should beginners start with?',
          questionAr: 'بماذا يجب أن يبدأ المبتدئون؟',
          options: ['Large investments', 'Demo account', 'Advanced strategies', 'Multiple markets'],
          optionsAr: ['استثمارات كبيرة', 'حساب تجريبي', 'استراتيجيات متقدمة', 'أسواق متعددة'],
          correct: 1
        }
      ]
    }
  ];

  return quizzes[quizNumber % quizzes.length];
};

// YouTube API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
