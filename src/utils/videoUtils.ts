
export const getYouTubeVideoId = (url: string): string | null => {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]*)/,
    /youtube\.com\/v\/([^#&?]*)/,
    // eslint-disable-next-line no-useless-escape
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

// Modern AI-powered trading academy content
export const getModernLessonContent = (lessonIndex: number) => {
  const lessons = [
    // Lesson 1: AI-Powered Account Setup
    {
      type: 'interactive',
      title: ' AI-Powered MT4/MT5 Setup',
      titleAr: ' إعا MT4/MT5 بالكا الاصطناع',
      description: 'Let Ruyaa AI guide you through setting up your first trading account',
      descriptionAr: 'ع كا ا الاصطناع جهك لإعا حساب التال الأل',
      content: {
        steps: [
          ' Download MT4/MT5 from your broker',
          ' AI analyzes your trading goals',
          '️ Smart account configuration',
          ' Ruyaa AI validates your setup'
        ],
        stepsAr: [
          ' تحل MT4/MT5 ن السط الخاص بك',
          ' الكا الاصطناع حلل أهاف التال',
          '️ تكن الحساب الك',
          ' كا ا تحقق ن الإعا'
        ],
        aiTips: [
          'Ruyaa AI recommends starting with demo accounts',
          'Our AI monitors your progress and suggests improvements',
          'Get personalized trading insights powered by AI'
        ],
        aiTipsAr: [
          'كا ا نصح بالب بالحسابات التجبة',
          'كانا الاصطناع اقب تقك قتح التحسنات',
          'احصل على ى تال شخصة عة بالكا الاصطناع'
        ]
      }
    },
    // Lesson 2: Understanding Market Interface
    {
      type: 'interactive',
      title: ' AI Market Analysis Dashboard',
      titleAr: ' لحة تحلل السق بالكا الاصطناع',
      description: 'Master MT4/MT5 interface with AI-powered insights',
      descriptionAr: 'إتقان اجهة MT4/MT5 ع ى الكا الاصطناع',
      content: {
        concepts: [
          ' Charts: Your window to market movements',
          ' Order Types: Market, Limit, Stop orders explained',
          ' Account Info: Balance, Equity, Margin tracking',
          ' AI Signals: Real-time trading recommendations'
        ],
        conceptsAr: [
          ' الس البانة: نافتك على حكات السق',
          ' أناع الأا: أا السق الح الإقاف',
          ' علات الحساب: تتبع الص الحقق الهاش',
          ' إشاات الكا الاصطناع: تصات التال الفة'
        ],
        examples: [
          'Example: EUR/USD chart showing AI-detected support at 1.0500',
          'Real case: How Ruyaa AI spotted 150-pip opportunity in GBP/JPY',
          'Live demo: AI analyzing news impact on gold prices'
        ]
      }
    },
    // Lesson 3: First Trade with AI
    {
      type: 'interactive',
      title: ' Your First AI-Guided Trade',
      titleAr: ' صفقتك الألى بإشا الكا الاصطناع',
      description: 'Execute your first trade with Ruyaa AI assistance',
      descriptionAr: 'نف صفقتك الألى بساعة كا ا',
      content: {
        steps: [
          ' AI identifies high-probability trade setup',
          ' Smart position sizing based on your risk profile',
          ' Execute trade with AI-calculated stop loss',
          ' Monitor with real-time AI updates'
        ],
        stepsAr: [
          ' الكا الاصطناع ح إعا التال عال الاحتال',
          ' تح حج الكز الك بناً على لف الخاط',
          ' تنف الصفقة ع قف الخساة الحسب بالكا الاصطناع',
          ' الاقبة ع التحثات الفة للكا الاصطناع'
        ],
        realExample: {
          pair: 'EUR/USD',
          entry: '1.0550',
          stopLoss: '1.0530',
          takeProfit: '1.0580',
          aiConfidence: '87%',
          reasoning: 'AI detected bullish divergence + support confluence'
        }
      }
    },
    // Lesson 4: Risk Management with AI
    {
      type: 'interactive',
      title: '️ AI-Powered Risk Management',
      titleAr: '️ إاة الخاط بالكا الاصطناع',
      description: 'Protect your capital with intelligent risk management',
      descriptionAr: 'اح أس الك بإاة الخاط الكة',
      content: {
        concepts: [
          ' 2% Rule: Never risk more than 2% per trade',
          ' AI calculates optimal position sizes automatically',
          ' Dynamic stop-loss adjustment based on volatility',
          ' Ruyaa AI monitors correlation risk across trades'
        ],
        conceptsAr: [
          ' قاعة 2%: لا تخاط بأكث ن 2% لكل صفقة',
          ' الكا الاصطناع حسب أحجا الاكز الثلى تلقائاً',
          ' تعل قف الخساة الناك بناً على التقلبات',
          ' كا ا اقب خاط الاتباط عب الصفقات'
        ],
        scenarios: [
          'Scenario 1: $1000 account  Max risk $20 per trade',
          'Scenario 2: AI detects high volatility  Reduces position size',
          'Scenario 3: Multiple correlated trades  AI warning system'
        ]
      }
    },
    // Lesson 5: Advanced AI Strategies
    {
      type: 'interactive',
      title: ' Advanced AI Trading Strategies',
      titleAr: ' استاتجات التال التقة بالكا الاصطناع',
      description: 'Unlock professional trading with Ruyaa AI algorithms',
      descriptionAr: 'افتح التال الحتف بخازات كا ا',
      content: {
        strategies: [
          ' AI Scalping: 1-5 minute AI-detected opportunities',
          ' Trend Following: AI identifies major trend shifts',
          ' Swing Trading: AI spots 3-7 day profit opportunities',
          ' Mean Reversion: AI catches oversold/overbought levels'
        ],
        strategiesAr: [
          ' الضابة بالكا الاصطناع: فص 1-5 قائق',
          ' تابعة الاتجاه: الكا الاصطناع ح تحلات الاتجاه الئسة',
          ' التال التأجح: الكا الاصطناع ص فص البح 3-7 أا',
          ' العة للتسط: الكا الاصطناع لتقط ستات الإفاط'
        ],
        aiFeatures: [
          'Smart entry/exit signals with 85%+ accuracy',
          'Real-time market sentiment analysis',
          'Automated trade management',
          'Personalized strategy recommendations'
        ]
      }
    }
  ];

  return lessons[lessonIndex % lessons.length];
};

// Enhanced quiz data with AI focus
export const getQuizData = (quizNumber: number) => {
  const quizzes = [
    {
      title: ' AI Trading Mastery Quiz',
      titleAr: ' اختبا إتقان التال بالكا الاصطناع',
      questions: [
        {
          question: 'What is the main advantage of AI-powered trading with Ruyaa?',
          questionAr: 'ا ه الزة الئسة للتال بالكا الاصطناع ع ا',
          options: ['Faster execution', '85%+ signal accuracy', 'Lower fees', 'Bigger profits'],
          optionsAr: ['تنف أسع', 'قة الإشاات 85%+', 'س أقل', 'أباح أكب'],
          correct: 1
        },
        {
          question: 'How does Ruyaa AI help with risk management?',
          questionAr: 'كف ساع كا ا ف إاة الخاط',
          options: ['Eliminates all risk', 'Calculates optimal position sizes', 'Guarantees profits', 'Predicts the future'],
          optionsAr: ['لغ جع الخاط', 'حسب أحجا الاكز الثلى', 'ضن الأباح', 'تنبأ بالستقبل'],
          correct: 1
        },
        {
          question: 'What should you do after completing this AI academy?',
          questionAr: 'اا جب أن تفعل بع إكال أكاة الكا الاصطناع',
          options: ['Start live trading immediately', 'Practice with demo + AI signals', 'Invest all savings', 'Ignore AI recommendations'],
          optionsAr: ['ابأ التال الباش فاً', 'تب ع التجب + إشاات الكا الاصطناع', 'استث جع الخات', 'تجاهل تصات الكا الاصطناع'],
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
    YT: unknown;
    onYouTubeIframeAPIReady: () => void;
  }
}
