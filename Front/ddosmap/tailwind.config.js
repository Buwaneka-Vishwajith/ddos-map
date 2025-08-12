/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          green: '#00ff41',
          red: '#ff3333',
          blue: '#00ccff',
          yellow: '#ffff00',
          purple: '#cc00ff'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}