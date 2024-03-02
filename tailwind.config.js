/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./defaults/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      "xxs": "280px",
      "xs": "321px",
     
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#154084",
        current: "currentColor"
      },
    },
  },
  plugins: [],
}