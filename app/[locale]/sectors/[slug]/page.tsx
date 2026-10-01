import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Label } from "@/components/Label";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectorIcon, sectorIds } from "@/components/SectorIcon";
import { SectorTile } from "@/components/SectorTile";
import { routing } from "@/i18n/routing";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => sectorIds.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const items = t.raw("sectors.items") as Array<{ id: string; name: string; tagline: string }>;
  const s = items.find((x) => x.id === slug);
  return s ? pageMeta(locale, `/sectors/${slug}`, s.name, s.tagline) : {};
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <Label>{title}</Label>
      <ul className="m-0 mt-6 list-none border-t border-line p-0">
        {items.map((it, i) => (
          <li key={it} className="flex items-baseline gap-5 border-b border-line py-4 text-[17px] text-navy">
            <span className="w-6 shrink-0 text-[12px] text-navy/45">{String(i + 1).padStart(2, "0")}</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function SectorPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();
  const sector = c.sectors.items.find((s) => s.id === slug);
  if (!sector) notFound();
  const others = c.sectors.items.filter((s) => s.id !== slug);

  return (
    <>
      <PageHero
        label={t("nav.sectors")}
        title={sector.name}
        intro={sector.tagline}
        crumbs={[{ label: t("nav.sectors"), href: "/sectors" }, { label: sector.name }]}
        aside={
          <span className="flex h-28 w-28 items-center justify-center border border-white/40 text-white">
            <SectorIcon id={sector.id} size={56} />
          </span>
        }
      />
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-[clamp(90px,10vw,150px)] lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Label>{t("sectors.opportunity")}</Label>
          </Reveal>
          <Reveal delay={100}>
            <p className="m-0 text-lead text-navy">{sector.opportunity}</p>
          </Reveal>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site gap-12 px-6 pb-[clamp(90px,10vw,150px)] lg:grid-cols-[1.1fr_1fr_1fr]">
          <Reveal>
            <ImagePlaceholder note={sector.name} ratio="4 / 5" tone="royal" />
          </Reveal>
          <Reveal delay={100}>
            <List title={t("sectors.buyers")} items={sector.buyers} />
          </Reveal>
          <Reveal delay={200}>
            <List title={t("sectors.help")} items={sector.help} />
            <ButtonLink href="/contact" variant="royal" className="mt-10">
              {t("sectors.cta")}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
      <section className="bg-soft">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="m-0 text-h3 text-navy">{t("gateway.sectorsTitle")}</h2>
            <ButtonLink href="/sectors" variant="outline-navy">
              {t("sectors.back")}
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Reveal key={s.id} className="h-full">
                <SectorTile sector={s} index={c.sectors.items.indexOf(s)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
