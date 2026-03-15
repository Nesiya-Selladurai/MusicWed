/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1ED760',
        background: '#121212',
        surface: '#181818',
        surfaceHover: '#282828',
      }
    },
  },
  plugins: [],
}
