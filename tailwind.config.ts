import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ajrak: {
          crimson: "#8C1D2C",
          "crimson-dark": "#5E1220",
          "crimson-light": "#A4262C",
          indigo: "#16284E",
          "indigo-dark": "#0D1830",
          "indigo-light": "#243B6B",
          ecru: "#F7F2E7",
          "ecru-dark": "#EAE0C9",
          iron: "#1A1A1A",
          gold: "#D4A24C",
          "gold-deep": "#A97B28",
        },
      },
      fontFamily: {
        nastaliq: ["var(--font-nastaliq)", "var(--font-gulzar)", "serif"],
        gulzar: ["var(--font-gulzar)", "serif"],
        inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      lineHeight: {
        nastaliq: "2.2",
        "nastaliq-tight": "2.0",
        "nastaliq-body": "2.4",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(132, 27, 45, 0.25)" },
          "50%": { boxShadow: "0 0 24px 4px rgba(132, 27, 45, 0.25)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
        "slide-up": "slide-up 0.25s ease-out",
        glow: "glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
