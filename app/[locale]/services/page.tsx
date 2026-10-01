import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { Label } from "@/components/Label";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceRow } from "@/components/ServiceRow";
import { getContent } from "@/lib/content";
import { bookingHref } from "@/lib/links";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/services", t("services.seo.title"), t("services.seo.description"));
}

export default async function Services({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero label={t("services.label")} title={t("services.title")} intro={t("services.intro")} crumbs={[{ label: t("nav.services") }]} />
      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(80px,9vw,140px)]">
          <div className="mb-12 grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("home.services.title")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <p className="m-0 max-w-[48ch] text-h6 text-navy/80">{t("services.partners")}</p>
            </Reveal>
          </div>
          {c.services.items.map((s, i) => (
            <ServiceRow key={s.name} service={s} index={i} />
          ))}
        </div>
      </section>
      <CtaBand title={t("services.cta.title")} href={bookingHref} />
    </>
  );
}
