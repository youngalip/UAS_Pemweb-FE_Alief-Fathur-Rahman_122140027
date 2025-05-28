// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E30613', // Red (Indonesian flag red)
          dark: '#B8050F',
          light: '#FF3B47',
        },
        secondary: {
          DEFAULT: '#FFFFFF', // White
          dark: '#F0F0F0',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          light: '#333333',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
