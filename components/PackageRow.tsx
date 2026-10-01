import { useTranslations } from "next-intl";
import type { Package } from "@/lib/types";
import { ButtonLink } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";

/** Zeyna "featured projects" row: number, title, text, list, button, image. Hairlines between rows. */
export function PackageRow({ pkg, index, cta = "/services" }: { pkg: Package; index: number; cta?: string }) {
  const t = useTranslations("packages");
  return (
    <Reveal className="grid gap-8 border-t border-line py-[clamp(40px,5vw,72px)] lg:grid-cols-[120px_1fr_1fr] lg:gap-12">
      <p className="m-0 text-[clamp(48px,5vw,80px)] font-light leading-none tracking-[-0.06em] text-royal">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="flex flex-col items-start">
        <span className="border border-line px-3 py-1.5 text-[12px] uppercase tracking-label text-navy/70">{pkg.duration}</span>
        <h3 className="m-0 mt-6 text-h4 text-navy">{pkg.name}</h3>
        <p className="m-0 mt-4 max-w-[42ch] text-[16px] leading-relaxed text-navy/70">{pkg.outcome}</p>
        <p className="m-0 mt-8 text-[12px] uppercase tracking-label text-navy/55">{t("includesLabel")}</p>
        <ul className="m-0 mt-3 w-full max-w-[460px] list-none p-0">
          {pkg.includes.map((inc) => (
            <li key={inc} className="flex items-center gap-3 border-b border-line py-3 text-[15px] text-navy">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-royal" />
              {inc}
            </li>
          ))}
        </ul>
        <ButtonLink href={cta} variant="outline-navy" className="mt-8">
          {t("cta")}
        </ButtonLink>
      </div>
      <ImagePlaceholder note={pkg.name} ratio="4 / 3" tone={index === 1 ? "royal" : "soft"} />
    </Reveal>
  );
}
