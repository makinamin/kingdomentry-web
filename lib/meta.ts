import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const ogLocale = { en: "en_GB", nl: "nl_NL", ar: "ar_SA" } as const;

/**
 * Title, description, canonical, hreflang alternates and share card for one page
 * in one locale. Titles come complete from the content doc, so no template is added.
 */
export function pageMeta(locale: string, path: string, title: string, description?: string): Metadata {
  const url = (l: string) => `/${l}${path === "/" ? "" : path}/`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
        "x-default": url(routing.defaultLocale),
      },
    },
    openGraph: {
      title,
      description,
      url: url(locale),
      siteName: "KingdomEntry",
      locale: ogLocale[locale as keyof typeof ogLocale] ?? locale,
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "KingdomEntry" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
