/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.php",
    "./includes/**/*.php",
    "./admin/**/*.php",
    "./ajax/**/*.php",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#273639',
          dark: '#153448',
          light: '#3C4A4C',
          gold: '#C5A880',
          accent: '#D4AF37',
          champagne: '#F7E7CE',
          pink: '#be185d',
          rose: '#e11d48',
          ivory: '#fef9f5',
          cream: '#faf5f0'
        }
      },
      fontFamily: {
        heading: ['Marcellus', 'Playfair Display', 'serif'],
        body: ['Poppins', 'Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
