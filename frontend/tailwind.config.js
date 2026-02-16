import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage:{
        "homeView-style-devTree": "url('/bg.svg')"
      },
      backgroundSize:{
        "homeView-xl" : "50%"
      }
    },
  },
  plugins: [  ],
}

