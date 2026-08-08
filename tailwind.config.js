export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'gold-dark': '#B8941F',
        cream: '#F5F1E8',
        'dark-gray': '#1A1A1A',
        'light-gray': '#999999',
        'error-red': '#E74C3C',
        'warm-yellow': '#FDB833',
        'surface-bright': '#fcf9f8',
        'on-surface': '#1c1b1b',
        'on-surface-variant': '#4d4635',
        'outline-variant': '#d0c5af',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        'margin-mobile': '16px',
        'margin-desktop': '64px',
      }
    },
  },
  plugins: [],
}