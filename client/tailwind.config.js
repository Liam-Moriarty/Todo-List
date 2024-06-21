/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "28.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["40px", "58px"],
      "8xl": ["65px", "78px"],
    },
    extend: {
      fontFamily: {
        poppins: ["Inter", "sans-serif"],
      },
      colors: {
        // DARK MODE
        "dark-primary": "#FCDC94", // PRIMARY COLOR
        "dark-secondary": "#EEEEEE", // SECONDARY COLOR
        "dark-neutral": "#F1E5D1", // HIGHLIGHT COLOR
        "dark-background": "#EF9C66", // BACKGROUND COLOR
        "dark-font": "#B3A398", // FONT COLOR
        "dark-font-secondary": "#EEEEEE", // FONT SECONDARY COLOR

        // LIGHT MODE
        "light-primary": "#ffffff", // light bg-primary
        "white-second": "#F5F5F5", // light secondary bg
        "slate-blue": "#685CFE", // highlights
        "black-text": "#000000",
      },
      boxShadow: {
        "3xl": "0 0 8px 7px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        wide: "1440px",
        custom: "855px",
      },
    },
  },
  plugins: [],
};
