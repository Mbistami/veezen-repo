module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Nunito", "sans-serif"],
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1380px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
  },
  plugins: [],
  variants: {
    // opacity: ["group-hover"],
    backgroundColor: ["group-hover"],
  },
};
