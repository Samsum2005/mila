/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // هذا السطر يجعل Cairo هو الخط الافتراضي لأي كلاس font-sans
        // وهو الخط التلقائي الذي يستخدمه Tailwind للنصوص
        sans: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}