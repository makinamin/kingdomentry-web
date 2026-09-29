import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: { DEFAULT: "#033CB2", deep: "#022A7D", lift: "#1A52C7" },
        gold: { DEFAULT: "#B18767", light: "#D2B497", deep: "#86634A", hover: "#C29B7C" },
        pearl: "#F7F7F5", stone: "#939598", horizon: "#BFD0F5", "ink-soft": "#4A4D57"
      },
      fontFamily: { sans: ["var(--font-ubuntu)", "system-ui", "sans-serif"], arabic: ["var(--font-reem-kufi)", "sans-serif"] },
      borderRadius: { sm: "8px", md: "12px", lg: "16px" },
      maxWidth: { site: "1200px" },
      letterSpacing: { label: "0.22em", wide: "0.34em" },
      boxShadow: { card: "0 24px 60px rgba(3,60,178,0.35)", raised: "0 30px 80px rgba(1,24,72,0.6), inset 0 1px 0 rgba(210,180,151,0.3)", glow: "0 12px 40px rgba(177,135,103,0.35)" },
      keyframes: {
        keFloat: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-18px)" } },
        keDust: { "0%,100%": { opacity: "0.2" }, "50%": { opacity: "0.9" } },
        keMilestone: { "0%,15%": { boxShadow: "0 0 0 0 rgba(210,180,151,0)", background: "#86634A" }, "25%,100%": { boxShadow: "0 0 24px 4px rgba(210,180,151,0.55)", background: "#D2B497" } }
      },
      animation: { float: "keFloat 7s ease-in-out infinite", dust: "keDust 4s ease-in-out infinite", milestone: "keMilestone 8s ease-in-out infinite" }
    }
  },
  plugins: []
};
export default config;
