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
      "space-grotesk": ["Space Grotesk", "Inter", "sans-serif"],
      manrope: ["Manrope", "Noto Sans", "sans-serif"],
      playfair: ['"Playfair Display"', "serif"],
      jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
    },
    extend: {
      colors: {
        // AI Theme Color Palette
        primary: {
          DEFAULT: "#00b4d8",
          50: "#e6f7ff",
          100: "#b3e9ff",
          200: "#80dbff",
          300: "#4dcdff",
          400: "#1abfff",
          500: "#00b4d8",
          600: "#0090a6",
          700: "#006c74",
          800: "#004842",
          900: "#002410",
        },
        secondary: {
          DEFAULT: "#bf00ff",
          50: "#f5e6ff",
          100: "#e6b3ff",
          200: "#d680ff",
          300: "#c74dff",
          400: "#b81aff",
          500: "#bf00ff",
          600: "#9900cc",
          700: "#730099",
          800: "#4d0066",
          900: "#260033",
        },
        background: {
          DEFAULT: "#1a1a2e",
          secondary: "#16213e",
          tertiary: "#0f3460",
        },
        surface: {
          DEFAULT: "#16213e",
          light: "#1e2a4a",
          dark: "#0f1a2e",
        },
        text: {
          primary: "#ffffff",
          secondary: "#e6e6e6",
          muted: "#b3b3b3",
          accent: "#00b4d8",
        },
        
        // Legacy compatibility
        green: "#00b4d8",
        gold: "#bf00ff",
        "dark-charcoal": "#1a1a2e",
        card: "#16213e",
        "primary-accent": "#00b4d8",
        "secondary-accent": "#bf00ff",
        
        // Shadcn base colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "ai-glow": "0 0 20px rgba(0, 180, 216, 0.3), 0 0 40px rgba(191, 0, 255, 0.2)",
        "ai-glow-strong": "0 0 30px rgba(0, 180, 216, 0.5), 0 0 60px rgba(191, 0, 255, 0.3)",
        "neural": "0 0 40px rgba(0, 180, 216, 0.2), inset 0 1px 0 rgba(0, 180, 216, 0.1)",
        "circuit": "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 180, 216, 0.1)",
        
        // Legacy support
        "green-glow": "0 0 20px rgba(0, 180, 216, 0.3)",
        "gold-glow": "0 0 20px rgba(191, 0, 255, 0.3)",
        "red-glow": "0 4px 24px rgba(239, 68, 68, 0.25)",
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      backdropBlur: {
        'xs': '2px',
      },
      keyframes: {
        // AI-themed animations
        "neural-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(0, 180, 216, 0.3)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(191, 0, 255, 0.5)",
            transform: "scale(1.02)"
          },
        },
        "circuit-flow": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        "data-stream": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "ai-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "ai-fade-in": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ai-pulse": {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        
        // Legacy animations
        floating: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-3px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
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
        // AI-themed animations
        "neural-pulse": "neural-pulse 3s ease-in-out infinite",
        "circuit-flow": "circuit-flow 10s linear infinite",
        "data-stream": "data-stream 3s ease-in-out infinite",
        "ai-float": "ai-float 6s ease-in-out infinite",
        "ai-fade-in": "ai-fade-in 0.8s ease-out",
        "ai-pulse": "ai-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        
        // Legacy animations
        floating: "floating 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "spin-slow": "spin 15s linear infinite",
        "pulse-slow": "ai-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-element": "floatElement 6s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-ai': 'linear-gradient(135deg, #00b4d8 0%, #bf00ff 100%)',
        'gradient-ai-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssRtl, typography],
} satisfies Config;