/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eaf5f7',
          100: '#d5ebf0',
          200: '#acd7e0',
          300: '#7fbfd0',
          400: '#49a2bc',
          500: '#18849c', // Matisse
          600: '#156a7d',
          700: '#125868',
          800: '#0f4554',
          900: '#0c3946',
          950: '#082530',
        },
        secondary: {
          50: '#f4eff8',
          100: '#e9dee8',
          200: '#d3c1dd',
          300: '#bda0cf',
          400: '#a47abf',
          500: '#8c58ab', // Deluge
          600: '#704789',
          700: '#5c3b70',
          800: '#48305b',
          900: '#3a274a',
          950: '#271935',
        },
        tertiary: {
          50: '#f5f4f7',
          100: '#e9e7ee',
          200: '#d3cfd9',
          300: '#b9b3c4',
          400: '#a295af',
          500: '#8c7c9c', // Mobster
          600: '#70637d',
          700: '#5d5168',
          800: '#4b4254',
          900: '#3e3746',
          950: '#29232f',
        },
        background: '#dfebf0', // Catskill White
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      textColor: {
        gradient: 'linear-gradient(90deg, #18849c, #8c58ab)',
      },
    },
  },
  plugins: [],
};