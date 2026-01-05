import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Visily Design System Colors
        primary: {
          DEFAULT: '#6BBE4A',
          50: '#E8F5E3',
          100: '#D4EDCB',
          200: '#ADDC9C',
          300: '#86CB6D',
          400: '#6BBE4A',
          500: '#54A336',
          600: '#428029',
          700: '#305D1E',
          800: '#1E3A13',
          900: '#0C1708',
        },
        secondary: {
          DEFAULT: '#9B8AFB',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#9B8AFB',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        background: '#F7F8FA',
        card: '#FFFFFF',
        border: '#E5E7EB',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B7280',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '6px',
      },
    },
  },
  plugins: [],
}

export default config
