import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import tailwindcssRtl from "tailwindcss-rtl"
import typography from "@tailwindcss/typography"

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
        // Enhanced futuristic palette
        bg: "#000000",
        primary: {
          DEFAULT: "#D4AF37",
          50: "#fff8cc",
          100: "#fff099",
          200: "#ffe866",
          300: "#ffe033",
          400: "#ffd900",
          500: "#D4AF37",
          600: "#e6c000",
          700: "#b39800",
          800: "#806f00",
          900: "#4d4600",
        },
        secondary: {
          DEFAULT: "#00A86B",
          50: "#e0f2eb",
          100: "#c2e5d6",
          200: "#9dd6bf",
          300: "#79c6a8",
          400: "#4eb786",
          500: "#00A86B",
          600: "#00855a",
          700: "#006349",
          800: "#004138",
          900: "#002d2b",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        surface: "#0a0a0a",
        "surface-light": "#1a1a1a",
        "surface-lighter": "#2a2a2a",

        // Enhanced legacy compatibility
        green: "#00A86B",
        gold: "#D4AF37",
        "dark-charcoal": "#000000",
        background: "#000000",
        card: "#0a0a0a",
        "primary-accent": "#D4AF37",
        "secondary-accent": "#00A86B",

        // Shadcn enhanced
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        futuristic: "0 8px 32px rgba(59, 130, 246, 0.15), 0 16px 64px rgba(59, 130, 246, 0.05)",
        "cyber-glow": "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.1)",
        neural: "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "3d-card": "0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(59, 130, 246, 0.1)",
        "ai-glow": "0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            transform: "scale(1.02)",
          },
        },
        "grid-move": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(50px, 50px)" },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(100vh) scale(0)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
            transform: "translateY(90vh) scale(1)",
          },
          "90%": {
            opacity: "1",
            transform: "translateY(10vh) scale(1)",
          },
        },
      },
      animation: {
        floating: "floating 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "grid-move": "grid-move 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssRtl, typography],
} satisfies Config
