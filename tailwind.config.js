/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Assicura che Tailwind funzioni nei componenti React
  theme: {
    extend: {},
  },
  variants:{
  extend:{
    textColor: ["hover"],
  },
  },

  plugins: [],
};
