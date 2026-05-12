import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        muted: "var(--muted)",
        line: "var(--line)",
        gold: "var(--gold)",
        "gold-soft": "var(--gold-soft)",
        slate: "var(--slate)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212, 175, 55, 0.18), 0 24px 80px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "gold-mist":
          "linear-gradient(135deg, rgba(212, 175, 55, 0.18), rgba(245, 223, 155, 0.02))",
      },
    },
  },
  plugins: [],
};

export default config;
