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
        bg: "#000000",
        green: "#00FF9D",
        gold: "#FFD700",
        "dark-charcoal": "#0A0A0A",
        background: "#000000",
        card: "#111111",
        "primary-accent": "#00FF9D",
        "secondary-accent": "#FFD700",
        // retain shadcn base;
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
        "green-glow":
          "0 0 30px 0 rgba(0,255,157,0.5), 0 0 60px 0 rgba(0,255,157,0.2)",
        "gold-glow":
          "0 0 30px 0 rgba(255,215,0,0.4), 0 0 60px 0 rgba(255,215,0,0.15)",
        "red-glow":
          "0 0 30px 0 rgba(239, 68, 68, 0.5), 0 0 60px 0 rgba(239, 68, 68, 0.2)",
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
