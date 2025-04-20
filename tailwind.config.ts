import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: {
          100: "#F7F2EC", // background-like beige
          200: "#FBE8C5", // soft yellow-beige
          DEFAULT: "#D4A762", // honey gold
        },
        secondary: {
          100: "#FBE843", // vibrant yellow for buttons
          DEFAULT: "#E2A03F", // hover state or base yellow
        },
        brown: {
          100: "#C6A87D", // light brown
          200: "#8D6E46", // mid brown
          300: "#5B3F23", // dark brown for text
          DEFAULT: "#4B2C14", // default brown (used in navbar/footer)
        },
        gray: {
          100: "#F5F5F5",
          200: "#D1D5DB",
          300: "#9CA3AF",
          DEFAULT: "#6B7280",
        },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#F9F9F9",
        },
        black: {
          DEFAULT: "#000000",
          100: "#333333",
        },
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "sans-serif"],
        "work-sans": ["var(--font-work-sans)", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        100: "0px 2px 6px rgba(0, 0, 0, 0.08)",
        200: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        300: "0px 8px 24px rgba(75, 44, 20, 0.15)",
      },
    },
  },
  plugins: [animate, typography],
};

export default config;
