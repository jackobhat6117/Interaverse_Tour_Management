/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["BRF", "sans-serif"],
        secondary: ["Helvetica_Neue", "sans-serif"],
      },
      screens: {
        xs: "350px",
      },
      colors: {
        // primary: '#000',
        primary: "rgba(var(--primary-color), <alpha-value>)",
        secondary: "#fff",
        // theme1: '#1E61DC'
        theme1: "rgba(var(--theme-color), <alpha-value>)",
        theme2: "rgba(var(--theme-color2), <alpha-value>)",
        primaryText: "#2E2E32",
        primary1: "#1E61DC",
        black1: "#000000",
      },
      fontSize: {
        xxxs: "10px",
        xxs: "12px",
      },
      height: {
        "470px": "470px",
        "550px": "550px",
      },
      minWidth: {
        "100px": "100px",
        "200px": "200px",
      },
      minHeight: {
        "50px": "50px",
        "280px": "280px",
      },
      maxWidth: {
        "600px": "600px",
      },
    },
  },
  plugins: [],
};
