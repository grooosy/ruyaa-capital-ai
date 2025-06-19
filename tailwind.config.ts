import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        // Pure futuristic palette
        bg: "#000000",
        primary: "#3b82f6", // Electric blue
        secondary: "#06b6d4", // Cyan
        accent: "#8b5cf6", // Purple
        surface: "#0a0a0a",
        "surface-light": "#1a1a1a",

        // Legacy compatibility
        green: "#06b6d4",
        gold: "#3b82f6",
        "dark-charcoal": "#000000",
        background: "#000000",
        card: "#0a0a0a",
        "primary-accent": "#3b82f6",
        "secondary-accent": "#06b6d4",

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
        futuristic: "0 4px 24px rgba(59, 130, 246, 0.15), 0 8px 48px rgba(59, 130, 246, 0.05)",
        "cyber-glow": "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)",
        neural: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "3d-card": "0 20px 40px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(59, 130, 246, 0.1)",

        // Legacy support
        "green-glow": "0 4px 24px rgba(6, 182, 212, 0.25)",
        "gold-glow": "0 4px 24px rgba(59, 130, 246, 0.25)",
        "ai-glow": "0 4px 24px rgba(59, 130, 246, 0.25)",
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
  plugins: [require("tailwindcss-animate"), require("tailwindcss-rtl"), require("@tailwindcss/typography")],
} satisfies Config
