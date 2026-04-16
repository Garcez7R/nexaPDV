/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f8f6",
          100: "#dcefe9",
          500: "#0f766e",
          700: "#115e59",
          900: "#0f2f2c"
        },
        accent: "#f59e0b",
        canvas: "#f5f3ea",
        ink: "#1d2939"
      },
      boxShadow: {
        soft: "0 16px 48px rgba(15, 47, 44, 0.12)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(15, 118, 110, 0.12) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};
