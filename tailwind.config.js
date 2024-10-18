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
      keyframes:{
        cardAnimIn:{
          '0%':{
            opacity: "0",
            transform: "translateY(30px)"
          },
          '100%':{

            opacity: "1",
            transform: "translateY(0)"

          }
        },
        drawerInMask:{
          "0%":{
            opacity:"0"
          },
          "100%":{
            opacity:"0.3"
          }
        },
        drawerIn:{
          "0%":{
            left:"-100vw"
          },
          "100%":{
            left:"0"
          }
        },

      },
    },
  },
  plugins: [],
}