/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lil-green': '#3E5F54',
        'lil-red': '#CF6757',
        'lil-yellow': '#E3E996',
      },
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"]
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
