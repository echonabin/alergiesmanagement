/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/alergies-ui/pages/**/*.{js,ts,jsx,tsx}',
    './libs/components/src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
