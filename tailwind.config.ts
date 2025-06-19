import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssRtl from "tailwindcss-rtl";
import typography from "@tailwindcss/typography";

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
        // Modern Dark Theme Palette
        bg: "#121212",
        primary: "#FFD700", // Gold accent
        secondary: "#1E1E1E", // Dark gray
        surface: "#1E1E1E",
        "surface-light": "#2A2A2A",
        
        // Legacy aliases for compatibility
        green: "#FFD700", // Changed to gold
        gold: "#FFD700",
        "dark-charcoal": "#121212",
        background: "#121212",
        card: "#1E1E1E",
        "primary-accent": "#FFD700",
        "secondary-accent": "#2A2A2A",
        
        // Shadcn base
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "glow": "0 4px 24px rgba(255, 215, 0, 0.25), 0 8px 48px rgba(255, 215, 0, 0.1)",
        "dark-glow": "0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.4)",
        "future-card": "0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.3)",
        "neural": "0 0 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 215, 0, 0.1)",
        
        // Legacy support
        "green-glow": "0 4px 24px rgba(255, 215, 0, 0.25)",
        "gold-glow": "0 4px 24px rgba(255, 215, 0, 0.25)",
        "red-glow": "0 4px 24px rgba(239, 68, 68, 0.25)",
      },
      scale: {
        '102': '1.02',
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
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatElement: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        floating: "floating 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "spin-slow": "spin 15s linear infinite",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "rotate-subtle": "rotate-subtle 10s ease-in-out infinite",
        "float-element": "floatElement 6s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssRtl, typography],
} satisfies Config;