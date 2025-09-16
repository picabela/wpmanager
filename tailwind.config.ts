import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        raspberry: {
          50: "#fff1f6",
          100: "#ffe4ee",
          200: "#ffbfd5",
          300: "#ff96b8",
          400: "#ff6a9a",
          500: "#e83c72",
          600: "#cc245d",
          700: "#a8174a",
          800: "#870f3b",
          900: "#6e0c30"
        }
      }
    }
  },
  plugins: []
};
export default config;
