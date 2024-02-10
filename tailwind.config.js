/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      signature: ["Edu SA Beginner"],
      poppins:"Poppins",
    },
    extend: {
      colors:{
        "Primary":"#071952",
        "Secondary":"#EFC75E"
      }
    },
  },
  plugins: [],
};
