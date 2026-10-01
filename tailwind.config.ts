import type { Config } from "tailwindcss";

// Base: tokens/tailwind.config.ts from the handoff (brand blue and gold, used by the logo).
// Theme layer: the Zeyna "construction company" look. Navy text, royal-blue bands,
// hairline dividers, square buttons, Geist throughout.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: { DEFAULT: "#033CB2", deep: "#022A7D", lift: "#1A52C7" },
        gold: { DEFAULT: "#B18767", light: "#D2B497", deep: "#86634A", hover: "#C29B7C" },
        pearl: "#F7F7F5",
        stone: "#939598",
        horizon: "#BFD0F5",
        "ink-soft": "#4A4D57",
        // Zeyna theme
        navy: { DEFAULT: "#021D5E", 2: "#0A2A73" },
        royal: { DEFAULT: "#003DA5", 2: "#043DC3", line: "#0F41BC" },
        line: "#C6CAD9",
        soft: "#F3F4F8",
        alert: "#C2261B",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        arabic: ["var(--font-plex-arabic)", "var(--font-geist)", "sans-serif"],
        brand: ["var(--font-ubuntu)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Zeyna scale (rem at 16px root), tight negative tracking.
        display: ["clamp(48px,6.2vw,90px)", { lineHeight: "1.06", letterSpacing: "-0.05em" }],
        h2: ["clamp(38px,4.6vw,67px)", { lineHeight: "1.12", letterSpacing: "-0.04em" }],
        h3: ["clamp(30px,3.4vw,50px)", { lineHeight: "1.18", letterSpacing: "-0.03em" }],
        h4: ["clamp(24px,2.4vw,38px)", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        h5: ["clamp(20px,1.8vw,28px)", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        h6: ["21px", { lineHeight: "1.4" }],
        lead: ["clamp(22px,2.2vw,32px)", { lineHeight: "1.35", letterSpacing: "-0.02em" }],
      },
      maxWidth: { site: "1360px" },
      letterSpacing: { label: "0.08em", wide: "0.12em" },
      transitionTimingFunction: { out: "cubic-bezier(.16,1,.3,1)" },
      keyframes: {
        rise: { from: { transform: "translateY(110%)" }, to: { transform: "translateY(0)" } },
        drift: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        rise: "rise 1.1s cubic-bezier(.16,1,.3,1) both",
        drift: "drift 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
