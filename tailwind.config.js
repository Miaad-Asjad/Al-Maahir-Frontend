/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3D1E6D',
        accent: '#5D5FEF',
      },
      fontFamily: {
  urdu: ["'Noto Sans Arabic'", "sans-serif"],
}

    },
  },
  plugins: [],
};
