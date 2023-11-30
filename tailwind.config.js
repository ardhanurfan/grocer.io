/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ['"Open Sans"', "sans-serif", "system-ui"],
      },
      colors: {
        dark: "#37381E",
        primary: "#006837",
        secondary: "#00C467",
        third: "#D2D27C",
      },
    },
  },
  plugins: [],
};
