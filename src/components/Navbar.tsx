
import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed z-30 top-0 left-0 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#181711cc] shadow-green"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
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
          <span className="text-lg font-playfair italic text-gold/90 hidden lg:block">It works while you sleep</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
            <Link to="/#ai" className="hover:text-green transition-colors font-semibold">How it works</Link>
            <Link to="/agents" className="hover:text-gold transition-colors font-semibold">AI Agents</Link>
            <Link to="/#deposit" className="hover:text-green transition-colors font-semibold">Deposit</Link>
            <Link to="/#footer" className="hover:text-gold transition-colors font-semibold">Contact</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
