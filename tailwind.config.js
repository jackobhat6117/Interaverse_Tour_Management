/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#000',
        'primary': 'rgba(var(--primary-color), <alpha-value>)',
        secondary: '#fff',
        // theme1: '#1E61DC'
        'theme1': 'rgba(var(--theme-color), <alpha-value>)',
      }
    },
  },
  plugins: [],
}

