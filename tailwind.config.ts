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
        // IntelligentB2B Design System Colors
        primary: {
          DEFAULT: '#0C1C2A',
          50: '#1A3A52',
          100: '#17334A',
          200: '#142C42',
          300: '#11253A',
          400: '#0E1E32',
          500: '#0C1C2A',
          600: '#091722',
          700: '#07121A',
          800: '#040C12',
          900: '#02060A',
        },
        secondary: {
          DEFAULT: '#10273A',
          50: '#2A5478',
          100: '#254B6C',
          200: '#204260',
          300: '#1B3954',
          400: '#163048',
          500: '#10273A',
          600: '#0C1E2E',
          700: '#081522',
          800: '#040C16',
          900: '#00030A',
        },
        accent: {
          DEFAULT: '#F6B73A',
          50: '#FEF9EC',
          100: '#FDF2D8',
          200: '#FCE6B1',
          300: '#FAD98A',
          400: '#F8CD63',
          500: '#F6B73A',
          600: '#E9A30E',
          700: '#B57F0B',
          800: '#815B08',
          900: '#4D3705',
        },
        background: '#0C1C2A',
        card: '#10273A',
        border: '#1A3A52',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8F8F94',
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
