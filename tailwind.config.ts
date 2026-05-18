// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   screens: {
    xs: "360px",   // small phones
    sm: "426px",   // large phones
    md: "768px",   // tablets
    ipad: "834px", // iPad portrait
    lg: "1024px",  // small laptops
    xl: "1280px",  // macbook / desktop
    "2xl": "1536px",
  },
    extend: {
      // your existing extend values go here
    },
  },
  plugins: [],
};

export default config;