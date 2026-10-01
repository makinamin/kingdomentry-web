import { useTranslations } from "next-intl";
import type { Package } from "@/lib/types";
import { ButtonLink } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";

/** Zeyna "featured projects" row for the three ways to work with us. */
export function PackageRow({ pkg, index }: { pkg: Package; index: number }) {
  const t = useTranslations();
  return (
    <Reveal className="grid gap-8 border-t border-line py-[clamp(40px,5vw,72px)] lg:grid-cols-[120px_1fr_1fr] lg:gap-12">
      <p className="m-0 text-[clamp(48px,5vw,80px)] font-light leading-none tracking-[-0.06em] text-royal">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="flex flex-col items-start">
        <h3 className="m-0 text-h3 text-navy">{pkg.name}</h3>
        <p className="m-0 mt-6 text-[12px] uppercase tracking-label text-navy/55">{t("how.packages.forLabel")}</p>
        <p className="m-0 mt-2 text-[17px] text-navy">{pkg.for}</p>
        <p className="m-0 mt-8 text-[12px] uppercase tracking-label text-navy/55">{t("how.packages.getLabel")}</p>
        <ul className="m-0 mt-3 w-full max-w-[480px] list-none p-0">
          {pkg.get.map((g) => (
            <li key={g} className="flex items-start gap-3 border-b border-line py-3 text-[15px] text-navy">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-royal" />
              {g}
            </li>
          ))}
        </ul>
        <ButtonLink href={`/contact?stage=${index}`} variant="outline-navy" className="mt-8">
          {t("buttons.touch")}
        </ButtonLink>
      </div>
      <ImagePlaceholder note={pkg.name} ratio="4 / 3" tone={index === 1 ? "royal" : "soft"} />
    </Reveal>
  );
}
