const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const headlessuiPlugin = require('@headlessui/tailwindcss')
const typographyPlugin = require('@tailwindcss/typography')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
        display: 'var(--font-lexend)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [addVariablesForColors, headlessuiPlugin, typographyPlugin],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}