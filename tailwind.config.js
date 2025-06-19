/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0A0A0A',
        'dark-surface': '#1A1A1A',
        'dark-border': '#2A2A2A',
        'white-soft': '#F8F8F8',
        'gray-light': '#B0B0B0',
        'gray-medium': '#808080',
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'grid-pulse': 'gridPulse 2s ease-in-out infinite',
        'grid-glow': 'gridGlow 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.15' },
        },
        gridGlow: {
          '0%': { opacity: '0.05' },
          '100%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};