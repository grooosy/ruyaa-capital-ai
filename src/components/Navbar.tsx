import React from "react";
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
        <Dialog>
          <DialogTrigger asChild>
            <button
              aria-label="Enlarge logo"
              className="p-0 bg-transparent border-none appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green rounded-sm"
            >
              <img
                src="/lovable-uploads/1344e471-1643-4f75-ae5c-9b0e36b02a0d.png"
                alt="RuyaaCapital-AI Logo"
                className="h-12 w-auto"
              />
            </button>
          </DialogTrigger>
          <DialogContent className="w-auto max-w-2xl p-0 bg-transparent border-none shadow-none">
            <img
              src="/lovable-uploads/1344e471-1643-4f75-ae5c-9b0e36b02a0d.png"
              alt="RuyaaCapital-AI Logo - enlarged"
              className="w-full h-auto rounded-lg"
            />
          </DialogContent>
        </Dialog>
        <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8">
                <a href="#ai" className="hover:text-green transition-colors font-semibold">How it works</a>
                <a href="#ai" className="hover:text-gold transition-colors font-semibold">AI Agents</a>
                <a href="#deposit" className="hover:text-green transition-colors font-semibold">Deposit</a>
                <a href="#footer" className="hover:text-gold transition-colors font-semibold">Contact</a>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-gold/30 to-transparent mx-8" />
            <span className="text-sm italic text-gold">It works while you sleep</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
