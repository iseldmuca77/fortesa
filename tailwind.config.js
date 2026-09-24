/**
 * Tailwind v4 reads its theme from `@theme` in src/app/globals.css.
 * This file only mirrors the Fortesa palette for reference / editor tooling.
 */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#141414", 2: "#1c1c1c", 3: "#2a2a2a" },
        cream: { DEFAULT: "#f7f4ec", 2: "#efe9dc", 3: "#e3dbc9" },
        gold: { DEFAULT: "#c9a54a", light: "#e2c574", dark: "#8a6a1e", deep: "#7a5a12" },
        muted: { DEFAULT: "#6e675b", dark: "#b3ab9b" },
      },
    },
  },
  plugins: [],
};
