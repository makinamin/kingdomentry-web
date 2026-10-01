import type { Config } from "tailwindcss";

// Base: tokens/tailwind.config.ts from the handoff (brand blue and gold, still used by the logo).
// Theme layer: the Gilroy look (night surfaces, mist grounds, violet gradient, ember glow).
// Swap the accent back to brand colours by changing `violet` and `indigo` here.
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
        // Gilroy theme
        night: { DEFAULT: "#131518", deep: "#050505", soft: "#1C1E22" },
        ink: { DEFAULT: "#181717", 2: "#363539", 3: "#484655" },
        mist: { DEFAULT: "#EDF1F3", line: "#DDDDDD" },
        muted: "#878787",
        violet: { DEFAULT: "#7D00FC", 2: "#A249ED", soft: "#B98BFF" },
        indigo: "#4300E7",
        ember: { DEFAULT: "#FE7524", 2: "#FF4C13" },
      },
      fontFamily: {
        sans: ["var(--font-epilogue)", "system-ui", "sans-serif"],
        arabic: ["var(--font-reem-kufi)", "sans-serif"],
        brand: ["var(--font-ubuntu)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gd-violet": "linear-gradient(90deg, #4300E7 0%, #7D00FC 100%)",
        "gd-ember": "linear-gradient(90deg, #FF4C13 0%, #FE7524 100%)",
      },
      borderRadius: { sm: "8px", md: "12px", lg: "16px", xl: "20px", "2xl": "30px" },
      maxWidth: { site: "1290px" },
      letterSpacing: { label: "0.22em", wide: "0.34em" },
      transitionTimingFunction: { out: "cubic-bezier(.23,1,.32,1)", spring: "cubic-bezier(0.31,-0.105,0.43,1.4)" },
      boxShadow: {
        card: "0 30px 60px rgba(19,21,24,0.08)",
        glow: "0 20px 50px rgba(125,0,252,0.35)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        spin: { to: { transform: "rotate(360deg)" } },
        tilt: { "0%,100%": { transform: "rotate(0)" }, "25%": { transform: "rotate(8deg)" }, "75%": { transform: "rotate(-8deg)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
        tilt: "tilt 0.5s linear",
        "pulse-dot": "pulseDot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
