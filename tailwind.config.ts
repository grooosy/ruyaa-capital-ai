
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
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    fontFamily: {
      manrope: ['Manrope', 'Noto Sans', 'sans-serif'],
      playfair: ['"Playfair Display"', 'serif'],
    },
    extend: {
      colors: {
        bg: "#181711",
        green: "#10A169",
        gold: "#CFA100",
        "dark-charcoal": "#181711",
        background: "#181711",
        card: "#23221c",
        "primary-accent": "#16C784",
        "secondary-accent": "#E6C419",
        // retain shadcn base;
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
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-3px)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
      },
      animation: {
        floating: 'floating 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-in': 'fade-in 0.3s ease-in',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
