
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, Clock, CheckCircle, Star, ArrowRight, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const courseVideos = [
  {
    id: 1,
    title: "MT4/MT5 Platform Overview",
    description: "Get familiar with the trading platform interface, charts, and basic navigation.",
    duration: "45s",
    thumbnail: "/lovable-uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png",
    videoUrl: "https://example.com/video1", // Replace with actual video URLs
    topics: ["Interface Navigation", "Chart Types", "Market Watch"]
  },
  {
    id: 2,
    title: "Placing Your First Trade",
    description: "Learn how to execute buy/sell orders, set stop-loss and take-profit levels.",
    duration: "40s",
    thumbnail: "/lovable-uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png",
    videoUrl: "https://example.com/video2",
    topics: ["Order Types", "Risk Management", "Trade Execution"]
  },
  {
    id: 3,
    title: "Risk Management Essentials",
    description: "Master position sizing, leverage control, and protecting your capital.",
    duration: "35s",
    thumbnail: "/lovable-uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png",
    videoUrl: "https://example.com/video3",
    topics: ["Position Sizing", "Leverage", "Capital Protection"]
  },
  {
    id: 4,
    title: "Reading Market Trends",
    description: "Understand chart patterns, indicators, and market sentiment analysis.",
    duration: "42s",
    thumbnail: "/lovable-uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png",
    videoUrl: "https://example.com/video4",
    topics: ["Chart Patterns", "Technical Indicators", "Market Analysis"]
  },
  {
    id: 5,
    title: "Advanced Trading Strategies",
    description: "Explore scalping, swing trading, and automated trading with Ruyaa AI.",
    duration: "38s",
    thumbnail: "/lovable-uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png",
    videoUrl: "https://example.com/video5",
    topics: ["Scalping", "Swing Trading", "AI Integration"]
  }
];

const AcademyPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(courseVideos[0]);
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);

  const markVideoComplete = (videoId: number) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

  const progressPercentage = (completedVideos.length / courseVideos.length) * 100;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-green/10 text-green border-green/20">
                Free Trading Course
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                RuyaaCapital <span className="text-gold">Academy</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Master MT4/MT5 trading with our comprehensive video course. Learn from industry experts and start trading with confidence using Ruyaa's AI-powered platform.
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 Lessons • 3 Min Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>2,500+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold fill-current" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Course Progress */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <Card className="bg-card border-green/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Course Progress</CardTitle>
                  <CardDescription>Complete all lessons to unlock trading benefits</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-gray-400">{completedVideos.length}/{courseVideos.length} completed</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green to-gold h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Course Content */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-green/20 mb-6">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-green/10 to-gold/10 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-green mx-auto mb-4" />
                      <p className="text-white font-semibold">{selectedVideo.title}</p>
                      <p className="text-gray-400 text-sm">{selectedVideo.duration}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                    <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedVideo.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="border-gold/30 text-gold">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      onClick={() => markVideoComplete(selectedVideo.id)}
                      className="w-full bg-green hover:bg-green/90"
                      disabled={completedVideos.includes(selectedVideo.id)}
                    >
                      {completedVideos.includes(selectedVideo.id) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Mark as Complete
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Course Completion CTA */}
              {progressPercentage === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6"
                >
                  <Card className="bg-gradient-to-r from-green/20 to-gold/20 border-green/30">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <CheckCircle className="w-12 h-12 text-green mx-auto mb-2" />
                        <h3 className="text-xl font-bold text-white">Congratulations!</h3>
                        <p className="text-gray-300">You've completed the MT4/MT5 Trading Course</p>
                      </div>
                      <Link to="/agents/mt4mt5">
                        <Button className="bg-gold hover:bg-gold/90 text-dark-charcoal font-semibold">
                          Start Trading with Ruyaa AI
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Course Playlist */}
            <div className="lg:col-span-1">
              <Card className="bg-card border-green/20">
                <CardHeader>
                  <CardTitle className="text-white">Course Curriculum</CardTitle>
                  <CardDescription>Complete all lessons in order</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {courseVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedVideo.id === video.id
                          ? 'border-green bg-green/10'
                          : 'border-gray-700 hover:border-gold/50 hover:bg-gold/5'
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {completedVideos.includes(video.id) ? (
                            <CheckCircle className="w-5 h-5 text-green" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-600 rounded-full flex items-center justify-center">
                              <span className="text-xs text-gray-400">{index + 1}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm mb-1 truncate">
                            {video.title}
                          </h4>
                          <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                            {video.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{video.duration}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Start Trading CTA */}
              <Card className="bg-gradient-to-br from-gold/10 to-green/10 border-gold/20 mt-6">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-10 h-10 text-gold mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Ready to Start Trading?</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Open your MT4/MT5 account with Ruyaa AI and get access to professional trading signals.
                  </p>
                  <Link to="/agents/mt4mt5">
                    <Button className="w-full bg-gold hover:bg-gold/90 text-dark-charcoal font-semibold">
                      Open Trading Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AcademyPage;
