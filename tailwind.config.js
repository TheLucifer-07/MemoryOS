/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },

    extend: {
      /* ────────────────────────────────────────────────
         MemoryOS — Aurora Memory Design System
      ──────────────────────────────────────────────── */

      colors: {
        /* Base */
        background: '#F8F4EE',
        surface: '#FFFFFF',
        ink: '#242424',
        vellum: '#FEFCF8',

        /* Brand */
        primary: {
          DEFAULT: '#8A7FD1',
          50: '#F5F3FF',
          100: '#ECE9FF',
          200: '#DAD5FA',
          300: '#BFB7F0',
          400: '#A59AE4',
          500: '#8A7FD1',
          600: '#766BC0',
          700: '#6259A5',
          800: '#4F4985',
          hover: '#766BC0',
          light: '#F3F1FD',
        },

        /* AI / Maps / Search */
        secondary: {
          DEFAULT: '#7EB5B0',
          50: '#F0FAF8',
          100: '#DDF1EF',
          200: '#BFE2DE',
          300: '#9DCFC9',
          400: '#7EB5B0',
          500: '#609A95',
          600: '#4D7D79',
          hover: '#6CA29D',
          light: '#EEF8F7',
        },
        ai: {
          DEFAULT: '#7EB5B0',
          50: '#F0FAF8',
          100: '#DDF1EF',
          200: '#BFE2DE',
          600: '#4D7D79',
          hover: '#6CA29D',
        },

        /* Premium Highlights */
        highlight: {
          DEFAULT: '#F6E7B2',
          50: '#FFF9E6',
          100: '#FDF0C7',
          200: '#F6E7B2',
          500: '#D6A936',
        },
        accent: {
          DEFAULT: '#F6E7B2',
          50: '#FFF9E6',
          100: '#FDF0C7',
          200: '#F6E7B2',
        },

        /* Typography */
        heading: '#242424',
        text: {
          heading: '#242424',
          DEFAULT: '#5F5B57',
          muted: '#8E8781',
          inverse: '#FFFFFF',
        },

        /* Borders */
        border: {
          DEFAULT: '#E7DED3',
          hover: '#D8CDC0',
          soft: '#F2ECE5',
        },

        /* Status */
        status: {
          success: '#6EB38A',
          warning: '#E2B14A',
          error: '#D97777',
          info: '#7EB5B0',
        },
        success: '#6EB38A',
        warning: '#E2B14A',
        error: '#D97777',
      },

      /* Typography */
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },

      /* Radius */
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        pill: '9999px',
      },

      /* Shadows */
      boxShadow: {
        soft:
          '0 2px 8px rgba(36,36,36,0.04)',
        card:
          '0 8px 24px rgba(36,36,36,0.06)',
        elevated:
          '0 16px 40px rgba(36,36,36,0.08)',
        journal:
          '0 24px 80px rgba(75,67,58,0.10), 0 2px 12px rgba(75,67,58,0.06)',
        nav:
          '0 12px 40px rgba(75,67,58,0.10), inset 0 1px 0 rgba(255,255,255,0.75)',
        inset:
          'inset 0 1px 0 rgba(255,255,255,0.85)',
        glow:
          '0 0 40px rgba(138,127,209,0.18)',
      },

      opacity: {
        15: '0.15',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
        88: '0.88',
      },

      /* Animation */
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: {
            opacity: '0',
            transform: 'translateY(16px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },

      animation: {
        'fade-in': 'fade-in 0.35s ease-out',
        'fade-up': 'fade-up 0.45s ease-out',
      },

      screens: {
        xs: '475px',
      },
    },
  },

  plugins: [],
};
