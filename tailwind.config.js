/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E11D48",
        sub1: "#F43F5E",
        sub2: "#FDA4AF",
        text1: "#1F2937",
        text2: "#6B7280",
      },
    },
  },
  plugins: [],
}

