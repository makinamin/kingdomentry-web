import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const paths = ["/", "/why-saudi", "/sectors", "/services", "/how-we-work", "/about", "/offices", "/faq", "/contact", "/privacy"];

const url = (l: string, p: string) => `${site.url}/${l}${p === "/" ? "" : p}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((p) =>
    routing.locales.map((l) => ({
      url: url(l, p),
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : p === "/privacy" ? 0.3 : 0.8,
      alternates: { languages: Object.fromEntries(routing.locales.map((x) => [x, url(x, p)])) },
    })),
  );
}
