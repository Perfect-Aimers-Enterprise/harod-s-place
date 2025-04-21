/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens:{
        'xs':'390px'
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: false
  }
}