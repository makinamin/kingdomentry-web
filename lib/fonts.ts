import { Geist, IBM_Plex_Sans_Arabic, Ubuntu } from "next/font/google";

// Zeyna theme typeface for all Latin text.
export const geist = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-geist",
});

// Arabic companion with the same light, neutral character as Geist.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-plex-arabic",
});

// Brand wordmark only (KINGDOMENTRY stays Ubuntu).
export const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "500"],
  display: "swap",
  variable: "--font-ubuntu",
});
