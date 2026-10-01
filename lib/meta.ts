import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/** Title, description, canonical and hreflang alternates for one page in one locale. */
export function pageMeta(locale: string, path: string, title: string, description?: string): Metadata {
  const url = (l: string) => `/${l}${path === "/" ? "" : path}/`;
  return {
    title,
    description,
    alternates: {
      canonical: url(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
        "x-default": url(routing.defaultLocale),
      },
    },
    openGraph: { title, description, url: url(locale), siteName: "Kingdom Entry", locale, type: "website" },
  };
}
