/* eslint-disable @typescript-eslint/no-var-requires */
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
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        white: "#FFF",
        nero: withOpacityValue("--tw-color-nero"),
        brightGray: withOpacityValue("--tw-color-bright-gray"),
        blueberry: withOpacityValue("--tw-color-blueberry"),
        disable: withOpacityValue("--tw-color-disable"),
        lightSilver: withOpacityValue("--tw-color-light-silver"),
        auroMetalSaurus: withOpacityValue("--tw-color-auro-metal-saurus"),
        aliceBlue: withOpacityValue("--tw-color-alice-blue"),
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
