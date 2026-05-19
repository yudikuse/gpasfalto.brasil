import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ===== Paleta Tarmac · GP Asfalto Brasil =====
        // Fundo dominante: azul meia-noite
        midnight: {
          DEFAULT: '#0A1428',
          soft:    '#131F3A',
          50:  '#E3E7EE',
          100: '#B8C0D0',
          200: '#8C97B1',
          300: '#5F6E92',
          400: '#324A74',
          500: '#1A2D54',
          600: '#131F3A',
          700: '#0A1428', // base
          800: '#070E1C',
          900: '#040810',
        },
        // Verde institucional (da logo, calibrado)
        emerald: {
          DEFAULT: '#1F8A4C',
          soft:    '#176A3A',
          glow:    '#2DD4A4',   // verde-menta para hover/acento
        },
        // Neutros
        bone: {
          DEFAULT: '#EFEAE0',
          dim:     '#D4CFC4',
        },
        steel: {
          DEFAULT: '#7D8896',
          dark:    '#4A5363',
        },
        // Acento amarelo-faixa-de-pista (uso mínimo)
        tarmac: '#FFD23F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Big Shoulders Display', 'Impact', 'sans-serif'],
        body:    ['var(--font-body)', 'Inter Tight', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Escala display "industrial"
        'hero':       ['clamp(3.5rem, 10vw, 9rem)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.92', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.05' }],
        'stat':       ['clamp(3rem, 8vw, 7rem)',     { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '128': '32rem',
        '144': '36rem',
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
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.8s cubic-bezier(.16,1,.3,1) forwards',
        'shimmer':    'shimmer 3s linear infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
