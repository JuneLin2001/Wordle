/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  theme: {
    extend: {
      colors: {
        'appworksschool': '#ff6b0f',
        'appworksschool-light': '#ffc19b',
      }
    },
  },
  plugins: [],
}

