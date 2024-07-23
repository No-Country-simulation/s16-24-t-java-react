/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import twscrollbar from "tailwind-scrollbar"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    twscrollbar
  ],
  theme: {
    fontFamily: {
      'nunito': ['"Nunito Variable"', ...defaultTheme.fontFamily.sans],
      'sans': ['"Nunito Sans Variable"', ...defaultTheme.fontFamily.sans],
      'assistant': ['"Assistant Variable"', ...defaultTheme.fontFamily.serif],
    },
    extend: {
      colors: {
        'primary': {
          0: "#210A4D",
          10: "#330F77",
          20: "#4515A0",
          30: "#561ACA",
          40: "#6D2FE4",
          50: "#8A59E9",
          60: "#A782EF",
          70: "#C5ACF4",
          80: "#E2D5FA"
        },
        'secondary': {
          0: "#A4EDAD",
          10: "#AEEFB6",
          20: "#B8F1BF",
          30: "#C2F3C8",
          40: "#CCF5D1",
          50: "#D7F7DB",
          60: "#E1F9E4",
          70: "#EBFBED",
          80: "#F5FDF6"
        },
        'secondarydark': {
          0:"#040B0B",
          10: "#081716",
          20: "#0B2221",
          30: "#0F2D2C",
          40: "#133936",
          50: "#174441",
          60: "#1A4F4C",
          70: "#1E5B57",
          80: "#226662"

        },
        'tertiary': {
          0: "#EAD8FD",
          10: "#ECDCFD",
          20: "#EFE1FD",
          30: "#F1E5FE",
          40: "#F3E9FE",
          50: "#F6EEFE",
          60: "#F8F2FE",
          70: "#FAF6FF",
          80: "#FDFBFF"
        }
      },
    }

  }
}