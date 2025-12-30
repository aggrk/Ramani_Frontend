/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        warning: "#8A0000",
        bgcolor: "#1A1A1A",
        textcolor: "#F8F8F8",
        textsecondary: "#D2B48C",
        primary: "#781717",
        textfooter: "#E5D4BD",
        bgfooter: "#2A2A2A",
        textalt: "#4D391E", //goes with textcolor background
      },
    },
  },
  plugins: [],
};
