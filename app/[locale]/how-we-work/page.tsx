import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { Label } from "@/components/Label";
import { PackageRow } from "@/components/PackageRow";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StepsGrid } from "@/components/StepsGrid";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/how-we-work", t("how.seo.title"), t("how.seo.description"));
}

export default async function HowWeWork({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero label={t("how.label")} title={t("how.title")} intro={t("how.intro")} crumbs={[{ label: t("nav.how") }]} />
      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <StepsGrid steps={c.how.steps} level={2} />
        </div>
      </section>
      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="mb-[clamp(40px,5vw,70px)] grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("how.packages.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 text-h2 text-navy">{t("how.packages.title")}</h2>
            </Reveal>
          </div>
          {c.how.packages.items.map((p, i) => (
            <PackageRow key={p.name} pkg={p} index={i} />
          ))}
          <Reveal className="mt-4 border-s-2 border-royal bg-soft p-[clamp(24px,3vw,40px)]">
            <p className="m-0 max-w-[60ch] text-h6 text-navy">{t("how.packages.note")}</p>
          </Reveal>
        </div>
      </section>
      <CtaBand title={t("how.cta.title")} button={t("buttons.touch")} />
    </>
  );
}
