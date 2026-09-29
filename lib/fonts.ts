import { Reem_Kufi, Ubuntu } from "next/font/google";

export const ubuntu = Ubuntu({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-ubuntu",
});

export const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-reem-kufi",
});
