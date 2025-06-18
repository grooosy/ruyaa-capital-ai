"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import LangToggle from "./LangToggle";
import { useProfile } from "@/hooks/useProfile";
import UserMenu from "./UserMenu";
import { Bell, Users, ChevronLeft, ChevronRight } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [depositMenu, setDepositMenu] = React.useState(false);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [session, setSession] = React.useState<Session | null>(null);
  const { data: profile } = useProfile(session);
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed z-30 top-12 left-0 w-full transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/80 border-b border-primary/20 shadow-ai-glow"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 group"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => window.history.forward()}
              className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 group"
              aria-label="Go forward"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Who We Are Button */}
          <button
            onClick={() => navigate("/about")}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
          >
            <Users className="w-4 h-4" />
            Who We Are
          </button>

          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  aria-label="Enlarge logo"
                  className="p-0 bg-transparent border-none appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green rounded-sm"
                >
                  <img
                    src="/lovable-uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png"
                    alt="RuyaaCapital-AI Logo"
                    className="h-12 w-auto"
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="w-auto max-w-2xl p-0 bg-transparent border-none shadow-none">
                <img
                  src="/lovable-uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png"
                  alt="RuyaaCapital-AI Logo - enlarged"
                  className="w-full h-auto rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <Link
            to="/how-it-works"
            className="hover:text-primary transition-colors font-semibold"
          >
            {t("how_it_works")}
          </Link>
          <Link
            to="/agents"
            className="hover:text-secondary transition-colors font-semibold"
          >
            {t("ai_agents")}
          </Link>
          <Link
            to="/academy"
            className="hover:text-primary transition-colors font-semibold"
          >
            {isArabic ? "أكاديمية" : "Academy"}
          </Link>
          <div className="relative group">
            <button
              id="deposit-btn"
              className="hover:text-secondary transition-colors font-semibold flex items-center gap-1"
            >
              {t("deposit")}
              <span className={`transition-transform group-hover:rotate-180`}>
                ▾
              </span>
            </button>
            <div className="absolute mt-2 right-0 bg-black/90 border border-primary/20 rounded-lg shadow-ai-glow py-2 w-48 z-50 backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                to="/deposit?tab=deposit"
                className="block px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors text-white"
              >
                Deposit
              </Link>
              <Link
                to="/deposit?tab=withdraw"
                className="block px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors text-white"
              >
                Withdraw
              </Link>
            </div>
          </div>
          <Link
            to="/#footer"
            className="hover:text-primary transition-colors font-semibold"
          >
            {t("contact")}
          </Link>
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 hover:bg-white/5 rounded-lg transition-colors group"
            >
              <Bell className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-black animate-pulse"></span>
            </button>
            <NotificationDropdown
              isOpen={notificationOpen}
              onClose={() => setNotificationOpen(false)}
            />
          </div>

          {session ? (
            <UserMenu
              fullName={profile?.full_name}
              avatarUrl={profile?.avatar_url}
            />
          ) : (
            <Link
              to="/auth"
              className="hover:text-secondary transition-colors font-semibold"
            >
              {t("login")}
            </Link>
          )}
          <LangToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
