/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts}"
    ],
    theme: {
      extend: {
        colors: {
          primary: '#2563eb',     // blue-600
          secondary: '#1e293b',   // slate-800
          accent: '#facc15',      // yellow-400
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },    
    plugins: [],
  }
  