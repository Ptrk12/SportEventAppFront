/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-bg-color": "var(--dark-bg-color)",
        "dark-bg-color-hover": "var(--dark-bg-color-hover)"
      },
      textColor:{
        "dark-text-color": "var(--dark-text-color)"
      }
    },
  },
  plugins: [],
}

