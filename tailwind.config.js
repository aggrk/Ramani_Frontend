/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#B22222",
        // accent: "#D2B48C",
        // secondary: "#556B2F",
        // textdark: "#1A1A1A",
        // textlight: "#333333",
        // warning: "#8A0000",
        // bgmobile: "#38471F",
        // textmobile: "#FFFFFF",
        // refactored
        bgcolor: "#1A1A1A",
        textcolor: "#F8F8F8",
        textsecondary: "#D2B48C",
        primary: "#781717",
        neutral: "#B6CD8E",
        textfooter: "#E5D4BD",
        bgfooter: "#2A2A2A",
        textalt: "#4D391E", //goes with textcolor background
      },
    },
  },
  plugins: [],
};
