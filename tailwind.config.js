/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0094B3',
        secondary: '#80CAEE',
        acceptgreen: '#13C296',
        stroke: '#E2E8F0',
        graydark: '#333A48',
      },
    },
  },
  plugins: [],
}
