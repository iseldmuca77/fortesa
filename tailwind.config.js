/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1e3a8a', // blue-900
          400: '#3b82f6', // blue-500
          900: '#1e293b', // blue-950
        },
        secondary: {
          400: '#f59e42', // orange-400
          300: '#fbbf24', // yellow-400
          700: '#b45309', // orange-700
        },
        accent: {
          500: '#10b981', // emerald-500
          300: '#6ee7b7', // emerald-300
          900: '#065f46', // emerald-900
        },
        neutral: {
          500: '#64748b', // slate-500
          300: '#cbd5e1', // slate-300
          800: '#334155', // slate-800
        },
      },
    },
  },
  plugins: [],
  darkMode: false,
};
