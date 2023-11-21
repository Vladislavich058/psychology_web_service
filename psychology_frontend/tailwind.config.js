const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cormorant Garamond", "sans", defaultTheme.fontFamily.sans],
        serif: ["Cormorant Garamond", "serif"],
        body: ["Cormorant Garamond", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
    },
  },
  plugins: [],
});
