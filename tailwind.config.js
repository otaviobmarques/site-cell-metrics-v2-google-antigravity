/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#90BE3D',
          forest: '#15623F',
          graphite: '#333D46',
          dark: '#1F262C',
          paper: '#F8F5F1',
          white: '#FFFFFF',
          cellGray: '#DDE1DC',
          line: '#E3DED6',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 35px -5px rgba(144, 190, 61, 0.35)',
        'glow-lime-lg': '0 0 60px -10px rgba(144, 190, 61, 0.5)',
        'glow-forest': '0 0 40px -8px rgba(21, 98, 63, 0.6)',
      }
    },
  },
  plugins: [],
}
