export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'gold-dark': '#B8960C',
        cream: '#F9F6EE',
        'dark-gray': '#1A1A1A',
        'mid-gray': '#4A4A4A',
        'light-gray': '#9A9A9A',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
}