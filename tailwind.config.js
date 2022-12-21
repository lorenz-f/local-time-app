/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      playfairDisplay: ["Playfair Display", "serif"]
    },
    screens: {
      /* sub 1200px is treated as mobile/tablet */
      'xxs': {'max': '499px'},
      'xs': {'max': '899px'},
      'sm': {'max': '1199px'},
      'md': {'max': '1599px'}
    }
  },
  plugins: [],
}
