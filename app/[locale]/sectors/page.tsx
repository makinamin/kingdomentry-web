import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { Label } from "@/components/Label";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectorRow } from "@/components/SectorRow";
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
      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(80px,9vw,140px)]">
          <div className="mb-12 grid gap-10 border-b border-line pb-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("gateway.sectorsLabel")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 text-h3 text-navy">{t("gateway.sectorsTitle")}</h2>
            </Reveal>
          </div>
          <div className="flex flex-col gap-5">
            {c.sectors.items.map((s, i) => (
              <SectorRow key={s.id} sector={s} index={i} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
