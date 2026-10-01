import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow, Title } from "@/components/Heading";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectorCard } from "@/components/SectorCard";
import { SectorIcon, sectorIds } from "@/components/SectorIcon";
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
    <div className="rounded-xl bg-white p-8 shadow-card">
      <h2 className="m-0 text-[22px] font-black">{title}</h2>
      <ul className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-[17px] leading-snug text-ink-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gd-violet text-white">
              <CheckIcon size={12} />
            </span>
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
  const index = c.sectors.items.findIndex((s) => s.id === slug);
  const sector = c.sectors.items[index];
  if (!sector) notFound();
  const others = c.sectors.items.filter((s) => s.id !== slug);

  return (
    <>
      <PageHero
        label={t("nav.sectors")}
        title={sector.name}
        intro={sector.tagline}
        crumbs={[{ label: t("nav.sectors"), href: "/sectors" }, { label: sector.name }]}
      />
      <section className="bg-mist py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto grid w-full max-w-site gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-10">
            <Reveal>
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gd-violet text-white shadow-glow">
                <SectorIcon id={sector.id} size={50} />
              </span>
            </Reveal>
            <Reveal delay={100}>
              <Eyebrow>{t("sectors.opportunity")}</Eyebrow>
              <p className="m-0 mt-4 text-[clamp(22px,2.4vw,32px)] font-black leading-[1.3] text-ink">{sector.opportunity}</p>
            </Reveal>
            <Reveal delay={150}>
              <ImagePlaceholder note={sector.name} ratio="16 / 10" />
            </Reveal>
          </div>
          <div className="flex flex-col gap-6">
            <Reveal delay={100}>
              <List title={t("sectors.buyers")} items={sector.buyers} />
            </Reveal>
            <Reveal delay={200}>
              <List title={t("sectors.help")} items={sector.help} />
            </Reveal>
            <Reveal delay={300}>
              <ButtonLink href="/contact" className="self-start">
                {t("sectors.cta")} <ArrowIcon />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="bg-night-deep py-[clamp(80px,10vw,140px)] text-white">
        <div className="mx-auto w-full max-w-site px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <Title tone="dark">{t("gateway.sectorsTitle")}</Title>
            <ButtonLink href="/sectors" variant="outline">
              {t("sectors.back")} <ArrowIcon />
            </ButtonLink>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {others.map((s, i) => (
              <Reveal key={s.id} delay={i * 80} className="h-full">
                <SectorCard sector={s} index={c.sectors.items.indexOf(s)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
