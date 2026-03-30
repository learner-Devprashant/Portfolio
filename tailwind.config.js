/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#F5C518",
        dark: "#111111",
        offwhite: "#F5F5F0",
        cardBg: "#EFEFEA",
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
