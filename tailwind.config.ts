import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          floral: "#FFFCF2",
          ash: "#C1CCBA",
          charcoal: "#403D39",
          carbon: "#252422",
          watermelon: "#EB2848",
          watermelonDark: "#D61F3E",
        },
      },
      boxShadow: {
        soft: "0 18px 60px rgba(37, 36, 34, 0.12)",
        card: "0 12px 30px rgba(37, 36, 34, 0.08)",
      },
      borderRadius: {
        cozy: "1.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "scale(.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "gentle-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
      },
      animation: {
        "fade-up": "fade-up .45s ease-out both",
        reveal: "reveal .5s ease-out both",
        "gentle-pulse": "gentle-pulse .5s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
