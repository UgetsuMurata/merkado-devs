/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-white': '#F9FAFA',
        'theme-orange': '#EA842A',
        'theme-pink': '#F8D4CB',
        'theme-light-pink': '#FFDDD4',
        'theme-dark-pink': '#F59CA0',
        'theme-dark-light-pink': '#FFA6B0',
      }
    },
  },
  plugins: [],
}

