/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        customFont: ["Paytone One", "sans-serif"],
        // Add more custom font families as needed
      },
      colors: {
        "white-tho": "#FAF8F6",
      },
    },
  },
  plugins: [],
};
