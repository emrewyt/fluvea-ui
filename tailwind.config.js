/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fluvea: {
          dark: '#09090f',
          surface: '#12121e',
          border: 'rgba(255, 255, 255, 0.08)',
          purple: '#8b5cf6',
          pink: '#ec4899',
          cyan: '#06b6d4',
          emerald: '#10b981',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        handwriting: ['Caveat', 'Dancing Script', 'cursive'],
        calligraphy: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'luxury-shimmer': 'luxuryShimmer 4s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        luxuryShimmer: {
          '0%': { filter: 'brightness(1) drop-shadow(0 0 15px rgba(168,85,247,0.3))' },
          '100%': { filter: 'brightness(1.25) drop-shadow(0 0 28px rgba(192,132,252,0.6))' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
