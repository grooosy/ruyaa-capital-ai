import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      manrope: ["Manrope", "Noto Sans", "sans-serif"],
      playfair: ['"Playfair Display"', "serif"],
      jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
    },
    extend: {
      colors: {
        // Futuristic AI Color Palette
        bg: "#0D0D0D",
        primary: "#7FFF00", // Neon green accent
        secondary: "#00C896", // Secondary teal
        surface: "#161618",
        "surface-light": "#1F1F23",
        
        // Legacy aliases for compatibility
        green: "#00C896",
        gold: "#FFB800",
        "dark-charcoal": "#0B0B0F",
        background: "#0B0B0F",
        card: "#161618",
        "primary-accent": "#FFB800",
        "secondary-accent": "#00C896",
        
        // Shadcn base
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        xl: "1.25rem", // cards
        "2xl": "1.5rem", // modals
      },
      boxShadow: {
        "ai-glow": "0 4px 24px rgba(255, 184, 0, 0.25), 0 8px 48px rgba(255, 184, 0, 0.1)",
        "emerald-glow": "0 4px 24px rgba(0, 200, 150, 0.25), 0 8px 48px rgba(0, 200, 150, 0.1)",
        "future-card": "0 8px 32px rgba(255, 184, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.4)",
        "neural": "0 0 40px rgba(255, 184, 0, 0.15), inset 0 1px 0 rgba(255, 184, 0, 0.1)",
        
        // Legacy support
        "green-glow": "0 4px 24px rgba(0, 200, 150, 0.25)",
        "gold-glow": "0 4px 24px rgba(255, 184, 0, 0.25)",
        "red-glow": "0 4px 24px rgba(239, 68, 68, 0.25)",
      },
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-3px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "rotate-subtle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1.5deg)" },
          "75%": { transform: "rotate(-1.5deg)" },
        },
      },
      animation: {
        floating: "floating 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.3s ease-in",
        "spin-slow": "spin 15s linear infinite",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "rotate-subtle": "rotate-subtle 10s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-rtl"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
