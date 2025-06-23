import type { Config } from 'tailwindcss';

export default {
  dark-Mode: ['class'],
  content: [
    './pages/**/*(.tsx?),'
    './components/*/*(.tsx?)',
    './app/*/*(.tsx?)',
    '.src/**/*.tsx?',
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      space: ['Space Grotesk', 'Inter', 'sans-serif'],
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
} as Config;