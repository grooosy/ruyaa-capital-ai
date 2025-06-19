
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
      title: '🤖 AI-Powered MT4/MT5 Setup',
      titleAr: '🤖 إعداد MT4/MT5 بالذكاء الاصطناعي',
      description: 'Let Ruyaa AI guide you through setting up your first trading account',
      descriptionAr: 'دع ذكاء رؤيا الاصطناعي يوجهك لإعداد حساب التداول الأول',
      content: {
        steps: [
          '🔗 Download MT4/MT5 from your broker',
          '🎯 AI analyzes your trading goals',
          '⚙️ Smart account configuration',
          '✅ Ruyaa AI validates your setup'
        ],
        stepsAr: [
          '🔗 تحميل MT4/MT5 من الوسيط الخاص بك',
          '🎯 الذكاء الاصطناعي يحلل أهداف التداول',
          '⚙️ تكوين الحساب الذكي',
          '✅ ذكاء رؤيا يتحقق من الإعداد'
        ],
        aiTips: [
          'Ruyaa AI recommends starting with demo accounts',
          'Our AI monitors your progress and suggests improvements',
          'Get personalized trading insights powered by AI'
        ],
        aiTipsAr: [
          'ذكاء رؤيا ينصح بالبدء بالحسابات التجريبية',
          'ذكاؤنا الاصطناعي يراقب تقدمك ويقترح التحسينات',
          'احصل على رؤى تداول شخصية مدعومة بالذكاء الاصطناعي'
        ]
      }
    },
    // Lesson 2: Understanding Market Interface
    {
      type: 'interactive',
      title: '📊 AI Market Analysis Dashboard',
      titleAr: '📊 لوحة تحليل السوق بالذكاء الاصطناعي',
      description: 'Master MT4/MT5 interface with AI-powered insights',
      descriptionAr: 'إتقان واجهة MT4/MT5 مع رؤى الذكاء الاصطناعي',
      content: {
        concepts: [
          '📈 Charts: Your window to market movements',
          '🎯 Order Types: Market, Limit, Stop orders explained',
          '💰 Account Info: Balance, Equity, Margin tracking',
          '🤖 AI Signals: Real-time trading recommendations'
        ],
        conceptsAr: [
          '📈 الرسوم البيانية: نافذتك على حركات السوق',
          '🎯 أنواع الأوامر: أوامر السوق والحد والإيقاف',
          '💰 معلومات الحساب: تتبع الرصيد والحقوق والهامش',
          '🤖 إشارات الذكاء الاصطناعي: توصيات التداول الفورية'
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
      title: '🚀 Your First AI-Guided Trade',
      titleAr: '🚀 صفقتك الأولى بإرشاد الذكاء الاصطناعي',
      description: 'Execute your first trade with Ruyaa AI assistance',
      descriptionAr: 'نفذ صفقتك الأولى بمساعدة ذكاء رؤيا',
      content: {
        steps: [
          '🎯 AI identifies high-probability trade setup',
          '📊 Smart position sizing based on your risk profile',
          '⚡ Execute trade with AI-calculated stop loss',
          '📱 Monitor with real-time AI updates'
        ],
        stepsAr: [
          '🎯 الذكاء الاصطناعي يحدد إعداد التداول عالي الاحتمال',
          '📊 تحديد حجم المركز الذكي بناءً على ملف المخاطر',
          '⚡ تنفيذ الصفقة مع وقف الخسارة المحسوب بالذكاء الاصطناعي',
          '📱 المراقبة مع التحديثات الفورية للذكاء الاصطناعي'
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
      title: '🛡️ AI-Powered Risk Management',
      titleAr: '🛡️ إدارة المخاطر بالذكاء الاصطناعي',
      description: 'Protect your capital with intelligent risk management',
      descriptionAr: 'احم رأس مالك بإدارة المخاطر الذكية',
      content: {
        concepts: [
          '💡 2% Rule: Never risk more than 2% per trade',
          '🎯 AI calculates optimal position sizes automatically',
          '📊 Dynamic stop-loss adjustment based on volatility',
          '🤖 Ruyaa AI monitors correlation risk across trades'
        ],
        conceptsAr: [
          '💡 قاعدة 2%: لا تخاطر بأكثر من 2% لكل صفقة',
          '🎯 الذكاء الاصطناعي يحسب أحجام المراكز المثلى تلقائياً',
          '📊 تعديل وقف الخسارة الديناميكي بناءً على التقلبات',
          '🤖 ذكاء رؤيا يراقب مخاطر الارتباط عبر الصفقات'
        ],
        scenarios: [
          'Scenario 1: $1000 account → Max risk $20 per trade',
          'Scenario 2: AI detects high volatility → Reduces position size',
          'Scenario 3: Multiple correlated trades → AI warning system'
        ]
      }
    },
    // Lesson 5: Advanced AI Strategies
    {
      type: 'interactive',
      title: '🧠 Advanced AI Trading Strategies',
      titleAr: '🧠 استراتيجيات التداول المتقدمة بالذكاء الاصطناعي',
      description: 'Unlock professional trading with Ruyaa AI algorithms',
      descriptionAr: 'افتح التداول المحترف بخوارزميات ذكاء رؤيا',
      content: {
        strategies: [
          '🔄 AI Scalping: 1-5 minute AI-detected opportunities',
          '📈 Trend Following: AI identifies major trend shifts',
          '💎 Swing Trading: AI spots 3-7 day profit opportunities',
          '🌊 Mean Reversion: AI catches oversold/overbought levels'
        ],
        strategiesAr: [
          '🔄 المضاربة بالذكاء الاصطناعي: فرص 1-5 دقائق',
          '📈 متابعة الاتجاه: الذكاء الاصطناعي يحدد تحولات الاتجاه الرئيسية',
          '💎 التداول المتأرجح: الذكاء الاصطناعي يرصد فرص الربح 3-7 أيام',
          '🌊 العودة للمتوسط: الذكاء الاصطناعي يلتقط مستويات الإفراط'
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
      title: '🤖 AI Trading Mastery Quiz',
      titleAr: '🤖 اختبار إتقان التداول بالذكاء الاصطناعي',
      questions: [
        {
          question: 'What is the main advantage of AI-powered trading with Ruyaa?',
          questionAr: 'ما هي الميزة الرئيسية للتداول بالذكاء الاصطناعي مع رؤيا؟',
          options: ['Faster execution', '85%+ signal accuracy', 'Lower fees', 'Bigger profits'],
          optionsAr: ['تنفيذ أسرع', 'دقة الإشارات 85%+', 'رسوم أقل', 'أرباح أكبر'],
          correct: 1
        },
        {
          question: 'How does Ruyaa AI help with risk management?',
          questionAr: 'كيف يساعد ذكاء رؤيا في إدارة المخاطر؟',
          options: ['Eliminates all risk', 'Calculates optimal position sizes', 'Guarantees profits', 'Predicts the future'],
          optionsAr: ['يلغي جميع المخاطر', 'يحسب أحجام المراكز المثلى', 'يضمن الأرباح', 'يتنبأ بالمستقبل'],
          correct: 1
        },
        {
          question: 'What should you do after completing this AI academy?',
          questionAr: 'ماذا يجب أن تفعل بعد إكمال أكاديمية الذكاء الاصطناعي؟',
          options: ['Start live trading immediately', 'Practice with demo + AI signals', 'Invest all savings', 'Ignore AI recommendations'],
          optionsAr: ['ابدأ التداول المباشر فوراً', 'تدرب مع التجريبي + إشارات الذكاء الاصطناعي', 'استثمر جميع المدخرات', 'تجاهل توصيات الذكاء الاصطناعي'],
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
