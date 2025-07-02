/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B22222", // Brick Red
        accent: "#D2B48C", // Sand / Beige
        secondary: "#556B2F", // Olive Green
        neutral: "#F8F8F8", // Off-white background
        textdark: "#1A1A1A", // For text
        textlight: "#333333", // For secondary text
        warning: "#8A0000",
      },
    },
  },
  plugins: [],
};
