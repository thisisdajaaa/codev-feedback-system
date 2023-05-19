/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");
const defaultTheme = require("tailwindcss/defaultTheme");

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }

    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "20rem",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        primary: ["Gotham", ...fontFamily.sans],
        secondary: ["Inter", ...fontFamily.sans],
        tertiary: ["Open Sans", ...fontFamily.sans],
      },
      colors: {
        white: "#FFF",
        brightGray: withOpacityValue("--tw-color-bright-gray"),
        blueberry: withOpacityValue("--tw-color-blueberry"),
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
