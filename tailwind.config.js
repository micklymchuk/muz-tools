/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: 'rgb(var(--color-black-rgb) / <alpha-value>)',
        white: 'rgb(var(--color-white-rgb) / <alpha-value>)',
        gray: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#1f1f1f',
          900: '#171717',
          950: '#0f0f0f',
        },
      },
    },
  },
  plugins: [],
}
