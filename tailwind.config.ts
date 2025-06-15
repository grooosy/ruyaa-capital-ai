
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

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
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    fontFamily: {
      manrope: ['Manrope', 'Noto Sans', 'sans-serif'],
      playfair: ['"Playfair Display"', 'serif'],
      jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
    },
    extend: {
      colors: {
        // DO NOT SPREAD ...colors HERE! This would overwrite the root.
        // Instead, just add your custom colors.
        // Custom greens do not overwrite Tailwind's green scale.
        'brand-green': "#10A169",
        gold: "#CFA100",
        "dark-charcoal": "#181711",
        background: "#181711",
        card: "#23221c",
        "primary-accent": "#16C784",
        "secondary-accent": "#E6C419",
        // shadcn base
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
      },
      borderRadius: {
        xl: '1.25rem', // cards
        '2xl': '1.5rem', // modals
      },
      boxShadow: {
        'green-glow': '0 0 20px 0 rgba(22,199,132,0.40)',
        'gold-glow': '0 0 20px 0 rgba(230,196,25,0.25)',
        'red-glow': '0 0 20px 0 rgba(239, 68, 68, 0.40)',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-3px)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'rotate-subtle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1.5deg)' },
          '75%': { transform: 'rotate(-1.5deg)' },
        },
      },
      animation: {
        floating: 'floating 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-in': 'fade-in 0.3s ease-in',
        'spin-slow': 'spin 15s linear infinite',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rotate-subtle': 'rotate-subtle 10s ease-in-out infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-rtl"), require("@tailwindcss/typography")],
} satisfies Config;

