import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        surface: "#FFFFFF",
        foreground: "#2D2A26",
        muted: "#6B645C",
        accent: {
          50: "#FDF6F1",
          100: "#FAEADE",
          200: "#F0D0B8",
          300: "#E4B693",
          400: "#D4A480",
          DEFAULT: "#C4926E",
          600: "#A87A58",
          700: "#8C6347",
          800: "#704D38",
          900: "#5A3E2D",
        },
        secondary: {
          50: "#F3F6F3",
          100: "#E4ECE4",
          200: "#C5D5C5",
          300: "#A5B5A5",
          400: "#98AA98",
          DEFAULT: "#8B9E8B",
          600: "#708670",
          700: "#5A6E5A",
          800: "#475747",
          900: "#374237",
        },
        mountain: "#5B7B8A",
        dark: "#1A1918",
        error: "#C4534A",
        success: "#5C8A5B",
      },
      fontFamily: {
        serif: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.07)",
        lg: "0 10px 15px rgba(0,0,0,0.1)",
        glow: "0 0 20px rgba(196,146,110,0.15)",
      },
      transitionTimingFunction: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
