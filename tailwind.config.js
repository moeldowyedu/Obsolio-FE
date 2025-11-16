/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4F46E5',  // Precision Blue - Main brand color
          600: '#4338CA',
          700: '#3730A3',
          800: '#312e81',
          900: '#1e1b4b',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10B981',  // Action Green - Success states
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        accent: {
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            500: '#8B5CF6',
            600: '#7c3aed',
            700: '#6d28d9',
          },
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            500: '#EC4899',
            600: '#db2777',
            700: '#be185d',
          },
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.7)',
          light: 'rgba(255, 255, 255, 0.5)',
          medium: 'rgba(255, 255, 255, 0.3)',
          dark: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['SF Pro', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['SF Pro', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
