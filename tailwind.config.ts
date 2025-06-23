import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssRtl from "tailwindcss-rtl";
import typography from "@tailwindcss/typography";
import tailwindPlugins from "./src/plugins/tailwind-plugins";

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
          // Modern dark theme with golden highlight
          background: {
            light: '#ffffff',
            dark: '#000000',
          },
          surface: {
            light: '#f3f3f3',
            dark: '#111111',
          },
          muted: {
            light: '#eeeeee',
            dark: '#1a1a1a',
          },
          // Border colors with theme support
          border: {
            light: '#d1d5db',
            dark: '#333333',
            DEFAULT: 'hsl(var(--border))',
          },
          text: {
            primary: {
              light: '#0a0a0a',
              dark: '#ffffff',
            },
            secondary: {
              light: '#555555',
              dark: '#cbd5e1',
            },
            muted: {
              light: '#757575',
              dark: '#888888',
            },
          },
          accent: {
            light: '#f5c518',
            dark: '#f5c518',
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },

        // Theme colors mapped to CSS variables for Tailwind classes
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        
        // Shadcn compatibility - border is now defined above with theme support
        background: "hsl(var(--background))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          light: "#ff4d4f",
          dark: "#ff4d4f",
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // Legacy compatibility
        green: "#10A169",
        gold: "#f5c518",
        "dark-charcoal": "#1a1a2e",
        card: "#111111",
        "primary-accent": "#f5c518",
        "secondary-accent": "#f5c518",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "ai-glow": "0 0 20px rgba(245, 197, 24, 0.3), 0 0 40px rgba(245, 197, 24, 0.2)",
        "ai-glow-strong": "0 0 30px rgba(245, 197, 24, 0.5), 0 0 60px rgba(245, 197, 24, 0.3)",
        "neural": "0 0 40px rgba(245, 197, 24, 0.2), inset 0 1px 0 rgba(245, 197, 24, 0.1)",
        "circuit": "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(245, 197, 24, 0.1)",

        // Legacy support
        "green-glow": "0 0 20px rgba(16, 161, 105, 0.3)",
        "gold-glow": "0 0 20px rgba(245, 197, 24, 0.3)",
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
            boxShadow: "0 0 20px rgba(245, 197, 24, 0.3)",
            transform: "scale(1)"
          },
          "50%": {
            boxShadow: "0 0 40px rgba(245, 197, 24, 0.5)",
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
      backgroundImage: {},
    },
  },
  plugins: [
    tailwindcssAnimate,
    tailwindcssRtl,
    typography,
    tailwindPlugins,
  ],
} satisfies Config;