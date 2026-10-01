import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectorCard } from "@/components/SectorCard";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/sectors", t("sectors.title"), t("sectors.intro"));
}

export default async function Sectors({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero label={t("nav.sectors")} title={t("sectors.title")} intro={t("sectors.intro")} crumbs={[{ label: t("nav.sectors") }]} />
      <section className="bg-mist py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto grid w-full max-w-site gap-6 px-6 sm:grid-cols-2 lg:grid-cols-6">
          {c.sectors.items.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 100} className={`h-full ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}>
              <SectorCard sector={s} index={i} tone="light" />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
