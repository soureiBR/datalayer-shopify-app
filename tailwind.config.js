// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Agrega las rutas a tus archivos .tsx, .jsx, .ts y .js
    "./app/**/*.{ts,tsx,js,jsx}",
    "./app/components/**/*.{ts,tsx,js,jsx}",
    "./app/routes/**/*.{ts,tsx,js,jsx}",
    // Agrega otras rutas según la estructura de tu proyecto
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


