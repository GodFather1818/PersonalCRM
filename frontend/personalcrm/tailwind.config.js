/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Playwrite: ["Playwrite ES Deco", "cursive"],
        auPlaywrite: ["Playwrite AU SA", "cursive"],
        frPlaywrite:["Playwrite FR Trad", "cursive"],
      }
    },
  },
  plugins: [],
}

