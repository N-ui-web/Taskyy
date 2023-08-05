const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  colors.fuchsia[50],
          100: colors.fuchsia[100],
          200: colors.fuchsia[200],
          300: colors.fuchsia[300],
          400: colors.fuchsia[400],
          500: colors.fuchsia[500],
          600: colors.fuchsia[600],
          700: colors.fuchsia[700],
          800: colors.fuchsia[800],
          900: colors.fuchsia[900],
        }
      }
    },
  },
}