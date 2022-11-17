/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily:{
        outfit: "Outfit",
        fredoka: "Fredoka One"
      }
    },
  },
  plugins: [],
  important: true,
  prefix: "tw-"
}
