import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: {
          DEFAULT: 'hsl(var(--background))',
          light: '#ffffff',
          dark: '#000000',
        },
        text: {
          primary: {
            light: '#0a0a0a',
            dark: '#ffffff',
          },
        },
        foreground: 'hsl(var(--foreground))',
        // custom theme colors
        bg: '#181711',
        green: '#16C784',
        gold: '#f5c518',
        'dark-charcoal': '#181711',
        card: '#23221c',
        'primary-accent': '#16C784',
        'secondary-accent': '#f5c518',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          "linear-gradient(rgba(22, 199, 132, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(22, 199, 132, 0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
