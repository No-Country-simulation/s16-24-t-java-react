/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import twscrollbar from "tailwind-scrollbar"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    twscrollbar,
    function ({ addUtilities }) {
      const newUtilities = {
        '.custom-date-input': {
          '&::-webkit-calendar-picker-indicator': {
            cursor: 'pointer',
            filter: 'invert(1)',
          },
        },
      };

      addUtilities(newUtilities);
    },
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
          0: "var(--color-0)",
          10: "var(--color-1)",
          20: "var(--color-2)",
          30: "var(--color-3)",
          40: "var(--color-4)",
          50: "var(--color-5)",
          60: "var(--color-6)",
          70: "var(--color-7)",
          80: "var(--color-8)"
        },
        'secondary': {
          0: "var(--color-9)",
          10: "var(--color-10)",
          20: "var(--color-11)",
          30: "var(--color-12)",
          40: "var(--color-13)",
          50: "var(--color-14)",
          60: "var(--color-15)",
          70: "var(--color-16)",
          80: "var(--color-17)"
        },
        'secondarydark': {
          0:"var(--color-18)",
          10: "var(--color-19)",
          20: "var(--color-20)",
          30: "var(--color-21)",
          40: "var(--color-22)",
          50: "var(--color-23)",
          60: "var(--color-24)",
          70: "var(--color-25)",
          80: "var(--color-26)"

        },
        'tertiary': {
          0: "var(--color-27)",
          10: "var(--color-28)",
          20: "var(--color-29)",
          30: "var(--color-30)",
          40: "var(--color-31)",
          50: "var(--color-32)",
          60: "var(--color-33)",
          70: "var(--color-34)",
          80: "var(--color-35)"
        }
      },
      
    },
  

  }
}