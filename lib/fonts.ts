import { Cairo, Geist, Ubuntu } from "next/font/google";

// Zeyna theme typeface for all Latin text.
export const geist = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-geist",
});

// Arabic typeface. Cairo is variable, so one file covers every weight, light display type included.
export const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  // Only Arabic pages lean on it; elsewhere it is one footer line, so skip the preload.
  preload: false,
  variable: "--font-cairo",
});

// Brand wordmark only (KINGDOMENTRY stays Ubuntu).
export const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "500"],
  display: "swap",
  variable: "--font-ubuntu",
});
