import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow, Title } from "@/components/Heading";
import { Marquee } from "@/components/Marquee";
import { PackageCard } from "@/components/PackageCard";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/services", t("services.title"), t("services.intro"));
}

export default async function Services({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero label={t("nav.services")} title={t("services.title")} intro={t("services.intro")} crumbs={[{ label: t("nav.services") }]} />
      <section className="bg-mist py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto grid w-full max-w-site gap-7 px-6 lg:grid-cols-3">
          {c.packages.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <PackageCard pkg={p} index={i} featured={i === 1} detailed />
            </Reveal>
          ))}
        </div>
      </section>
      <Marquee tone="dark" items={c.packages.items.map((p) => p.name)} />
      <section className="bg-mist py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-full max-w-site px-6">
          <Reveal>
            <Eyebrow>{t("how.label")}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <Title accent="stroke-rest" className="mt-3">
              {t("how.title")}
            </Title>
          </Reveal>
          <div className="mt-14">
            <ProcessSteps steps={c.how.steps} />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
