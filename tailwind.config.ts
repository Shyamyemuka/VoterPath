import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "india-saffron": "#FF9933",
        "india-white": "#FFFFFF",
        "india-green": "#138808",
        "dark-bg": "#050505",
        "dark-card": "#111111",
        "dark-accent": "#FF4500",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "float-left": {
          "0%, 100%": { transform: "translateY(0) rotate(0)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "float-right": {
          "0%, 100%": { transform: "translateY(0) rotate(0)" },
          "50%": { transform: "translateY(20px) rotate(-2deg)" },
        },
      },
      animation: {
        "float-left": "float-left 12s ease-in-out infinite",
        "float-right": "float-right 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
