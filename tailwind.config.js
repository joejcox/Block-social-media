const colors = require("tailwindcss/colors")

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts}"],
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      teal: colors.teal,
      cyan: colors.cyan,
      indigo: colors.indigo,
      blue: colors.blue,
      orange: colors.orange,
      red: colors.red,
      violet: colors.violet,
      purple: colors.purple,
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/images/home-bg.jpg')",
        "signup-bg": "url('/src/assets/images/form-bg-1.jpg')",
        "signin-bg": "url('/src/assets/images/form-bg-2.jpg')",
      },
    },
  },
}
