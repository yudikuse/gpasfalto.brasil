import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ====== PALETA GP — calibrada com a logo oficial ======
        'gp-green': {
          DEFAULT: '#1F770F',
          50:  '#E8F2E5',
          100: '#C4DDBD',
          200: '#9FC892',
          300: '#7AB367',
          400: '#559E3D',
          500: '#1F770F',
          600: '#195F0C',
          700: '#134709',
          800: '#0C3006',
          900: '#061803',
          bright: '#34C759',
        },
        'gp-navy': {
          DEFAULT: '#171C5E',
          50:  '#E8E9F2',
          100: '#BFC1DC',
          200: '#9698C6',
          300: '#6D6FAF',
          400: '#444799',
          500: '#171C5E',
          600: '#13174E',
          700: '#0F133E',
          800: '#0D1142',
          900: '#070935',
          deep: '#0D1142',
        },
        'gp-steel': {
          DEFAULT: '#A7A8AC',
          50:  '#F5F5F6',
          100: '#E6E6E8',
          200: '#D2D3D6',
          300: '#A7A8AC',
          400: '#7C7D82',
          500: '#5F6065',
          600: '#454649',
        },
        'gp-bone': {
          DEFAULT: '#F0EBE2',
          50:  '#FBFAF7',
          100: '#F0EBE2',
          200: '#E1D7C3',
        },
        // ====== CTA — laranja de conversão (complementar do verde GP) ======
        'gp-orange': {
          DEFAULT: '#FF6B00',
          50:  '#FFF1E5',
          100: '#FFD9B8',
          200: '#FFBE8A',
          300: '#FFA35C',
          400: '#FF882E',
          500: '#FF6B00',
          600: '#E55A00',
          700: '#CC4F00',
          800: '#993B00',
          900: '#662700',
          dark: '#E55A00',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Big Shoulders Display', 'Impact', 'sans-serif'],
        body:    ['var(--font-body)', 'Inter Tight', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero':       ['clamp(3.5rem, 10vw, 9rem)',  { lineHeight: '0.9',  letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '1',    letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1' }],
        'stat':       ['clamp(3rem, 8vw, 7rem)',     { lineHeight: '1',    letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      transitionTimingFunction: {
        'out-expo':    'cubic-bezier(.16,1,.3,1)',
        'in-out-expo': 'cubic-bezier(.87,0,.13,1)',
      },
      transitionDuration: {
        '400':  '400ms',
        '600':  '600ms',
        '800':  '800ms',
        '1200': '1200ms',
      },
      animation: {
        'fade-up':  'fadeUp 0.8s cubic-bezier(.16,1,.3,1) forwards',
        'shimmer':  'shimmer 3s linear infinite',
        'pulse-cta': 'pulseCta 2.5s cubic-bezier(.4,0,.6,1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseCta: {
          '0%, 100%': { boxShadow: '0 8px 24px -8px rgba(255,107,0,.5)' },
          '50%':      { boxShadow: '0 12px 32px -8px rgba(255,107,0,.85)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
