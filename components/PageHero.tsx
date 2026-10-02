import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Label, RiseTitle, splitTitle } from "./Label";
import { SkylineLines } from "./SkylineLines";
import type { ReactNode } from "react";

/** Royal-blue banner for inner pages: label, huge light title, intro, breadcrumb. */
export function PageHero({
  label,
  title,
  intro,
  crumbs,
  aside,
}: {
  label?: string;
  title: string;
  intro?: string;
  crumbs: Array<{ label: string; href?: string }>;
  aside?: ReactNode;
}) {
  const t = useTranslations("nav");
  return (
    <section className="relative isolate overflow-hidden bg-royal pb-[clamp(56px,7vw,100px)] pt-[clamp(150px,15vw,220px)] text-white">
      <SkylineLines className="text-white" opacity={0.28} />
      <div className="relative mx-auto grid w-full max-w-site gap-12 px-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          {label ? <Label tone="dark">{label}</Label> : null}
          <RiseTitle as="h1" lines={splitTitle(title)} className="mt-6 max-w-[16ch] text-display text-white" />
          {intro ? <p className="m-0 mt-8 max-w-[44ch] text-[16px] leading-relaxed text-white/80">{intro}</p> : null}
        </div>
        {aside ? <div className="lg:justify-self-end">{aside}</div> : null}
      </div>
      <nav aria-label="Breadcrumb" className="relative mx-auto mt-14 w-full max-w-site px-6">
        <ol className="m-0 flex list-none flex-wrap items-center gap-3 border-t border-white/25 p-0 pt-5 text-[13px]">
          <li>
            <Link href="/" className="-my-3 inline-block min-w-11 py-3 text-white/70 no-underline hover:text-white">
              {t("home")}
            </Link>
          </li>
          {crumbs.map((c) => (
            <li key={c.label} className="flex items-center gap-3">
              <span aria-hidden className="text-white/40">/</span>
              {c.href ? (
                <Link href={c.href} className="text-white/70 no-underline hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-white">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
