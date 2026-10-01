import { Epilogue, Reem_Kufi, Ubuntu } from "next/font/google";

// Gilroy theme typeface for all Latin text.
export const epilogue = Epilogue({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-epilogue",
});

// Brand wordmark only (KINGDOMENTRY stays Ubuntu).
export const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "500"],
  display: "swap",
  variable: "--font-ubuntu",
});

export const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-reem-kufi",
});
