-- Create a table for video courses and lessons
CREATE TABLE public.video_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  difficulty_level TEXT NOT NULL DEFAULT 'beginner',
  total_lessons INTEGER NOT NULL DEFAULT 0,
  total_duration_minutes INTEGER NOT NULL DEFAULT 0,
  thumbnail_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for individual video lessons
CREATE TABLE public.video_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.video_courses(id) ON DELETE CASCADE NOT NULL,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  video_url TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  thumbnail_url TEXT,
  topics TEXT[] DEFAULT '{}',
  topics_ar TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to track user progress through courses
CREATE TABLE public.user_course_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.video_courses(id) ON DELETE CASCADE NOT NULL,
  completed_lessons UUID[] DEFAULT '{}',
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE public.video_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_courses (public read access)
CREATE POLICY "Anyone can view active courses" 
  ON public.video_courses 
  FOR SELECT 
  USING (is_active = true);

-- RLS Policies for video_lessons (public read access)
CREATE POLICY "Anyone can view active lessons" 
  ON public.video_lessons 
  FOR SELECT 
  USING (is_active = true);

-- RLS Policies for user_course_progress (users can only see their own progress)
CREATE POLICY "Users can view their own progress" 
  ON public.user_course_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
  ON public.user_course_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
  ON public.user_course_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Insert sample MT4/MT5 course data
INSERT INTO public.video_courses (title, title_ar, description, description_ar, difficulty_level, total_lessons, total_duration_minutes, thumbnail_url) 
VALUES (
  'Complete MT4/MT5 Trading Mastery',
  'إتقان تداول MT4/MT5 الكامل',
  'Master MT4/MT5 trading with our comprehensive course. Learn from industry experts and start trading with confidence using Ruyaa''s AI-powered platform.',
  'أتقن تداول MT4/MT5 مع دورتنا الشاملة. تعلم من خبراء الصناعة وابدأ التداول بثقة باستخدام منصة رؤيا المدعومة بالذكاء الاصطناعي.',
  'beginner',
  5,
  20,
  '/uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png'
);

-- Get the course ID for inserting lessons
-- Insert sample lessons (using a subquery to get the course ID)
INSERT INTO public.video_lessons (course_id, lesson_number, title, title_ar, description, description_ar, video_url, duration_seconds, thumbnail_url, topics, topics_ar) 
SELECT 
  c.id,
  1,
  'MT4/MT5 Platform Overview',
  'نظرة عامة على منصة MT4/MT5',
  'Get familiar with the trading platform interface, charts, and basic navigation.',
  'تعرف على واجهة منصة التداول والمخططات والتنقل الأساسي.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  2700,
  '/uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png',
  ARRAY['Interface Navigation', 'Chart Types', 'Market Watch'],
  ARRAY['التنقل في الواجهة', 'أنواع المخططات', 'مراقبة السوق']
FROM public.video_courses c WHERE c.title = 'Complete MT4/MT5 Trading Mastery';

INSERT INTO public.video_lessons (course_id, lesson_number, title, title_ar, description, description_ar, video_url, duration_seconds, thumbnail_url, topics, topics_ar) 
SELECT 
  c.id,
  2,
  'Placing Your First Trade',
  'تنفيذ صفقتك الأولى',
  'Learn how to execute buy/sell orders, set stop-loss and take-profit levels.',
  'تعلم كيفية تنفيذ أوامر الشراء/البيع وتحديد مستويات وقف الخسارة وجني الأرباح.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  2400,
  '/uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png',
  ARRAY['Order Types', 'Risk Management', 'Trade Execution'],
  ARRAY['أنواع الأوامر', 'إدارة المخاطر', 'تنفيذ الصفقات']
FROM public.video_courses c WHERE c.title = 'Complete MT4/MT5 Trading Mastery';

INSERT INTO public.video_lessons (course_id, lesson_number, title, title_ar, description, description_ar, video_url, duration_seconds, thumbnail_url, topics, topics_ar) 
SELECT 
  c.id,
  3,
  'Risk Management Essentials',
  'أساسيات إدارة المخاطر',
  'Master position sizing, leverage control, and protecting your capital.',
  'أتقن تحديد حجم المراكز والتحكم في الرافعة المالية وحماية رأس مالك.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  2100,
  '/uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png',
  ARRAY['Position Sizing', 'Leverage', 'Capital Protection'],
  ARRAY['حجم المراكز', 'الرافعة المالية', 'حماية رأس المال']
FROM public.video_courses c WHERE c.title = 'Complete MT4/MT5 Trading Mastery';

INSERT INTO public.video_lessons (course_id, lesson_number, title, title_ar, description, description_ar, video_url, duration_seconds, thumbnail_url, topics, topics_ar) 
SELECT 
  c.id,
  4,
  'Reading Market Trends',
  'قراءة اتجاهات السوق',
  'Understand chart patterns, indicators, and market sentiment analysis.',
  'افهم أنماط المخططات والمؤشرات وتحليل معنويات السوق.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  2520,
  '/uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png',
  ARRAY['Chart Patterns', 'Technical Indicators', 'Market Analysis'],
  ARRAY['أنماط المخططات', 'المؤشرات الفنية', 'تحليل السوق']
FROM public.video_courses c WHERE c.title = 'Complete MT4/MT5 Trading Mastery';

INSERT INTO public.video_lessons (course_id, lesson_number, title, title_ar, description, description_ar, video_url, duration_seconds, thumbnail_url, topics, topics_ar) 
SELECT 
  c.id,
  5,
  'Advanced Trading Strategies',
  'استراتيجيات التداول المتقدمة',
  'Explore scalping, swing trading, and automated trading with Ruyaa AI.',
  'استكشف المضاربة السريعة والتداول المتأرجح والتداول الآلي مع رؤيا AI.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  2280,
  '/uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png',
  ARRAY['Scalping', 'Swing Trading', 'AI Integration'],
  ARRAY['المضاربة السريعة', 'التداول المتأرجح', 'تكامل الذكاء الاصطناعي']
FROM public.video_courses c WHERE c.title = 'Complete MT4/MT5 Trading Mastery';
