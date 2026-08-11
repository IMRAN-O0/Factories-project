/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6faf0',
          100: '#ebf4dc',
          200: '#d7e9b9',
          300: '#bedb8f',
          400: '#a6ce64',
          500: '#98c64c',
          600: '#7eaa36',
          700: '#65872b',
          800: '#4e6821',
          900: '#394d19',
          950: '#253210',
        },
        ink: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          400: '#6b6b6b',
          600: '#3d3d3d',
          800: '#1a1a1a',
          900: '#0d0d0d',
        },
        night: {
          50: '#e9ede4',
          100: '#cdd6c2',
          200: '#9fae8f',
          400: '#5c6b52',
          600: '#2c3527',
          700: '#212820',
          800: '#171d15',
          900: '#10140d',
          950: '#0a0d08',
        },
      },
      fontFamily: {
        arabic: ['"Tajawal"', 'sans-serif'],
        display: ['"Markazi Text"', '"Tajawal"', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 30px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
