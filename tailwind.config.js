/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,tsx,mdx}',
    './app/**/*.{js,ts,tsx,mdx}',
    './lib/**/*.{js,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a0a0f',
          900: '#0d0d14',
          800: '#111120',
          700: '#1a1a2e',
          600: '#1e1e3a',
        },
        accent: {
          emerald: '#10b981',
          cyan: '#06b6d4',
          DEFAULT: '#10b981',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
    },
  },
  plugins: [],
};