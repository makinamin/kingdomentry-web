import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
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
  return pageMeta(locale, "/services", t("services.title"), t("services.intro"));
}

export default async function Services({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero
        label={t("nav.services")}
        title={t("services.title")}
        intro={t("services.intro")}
        crumbs={[{ label: t("nav.services") }]}
        aside={
          <ButtonLink href="/contact" variant="white">
            {t("packages.cta")}
          </ButtonLink>
        }
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site items-center gap-12 px-6 py-[clamp(90px,10vw,150px)] lg:grid-cols-2">
          <div>
            <Reveal>
              <Label>{t("packages.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 mt-6 max-w-[18ch] text-h3 text-navy">{t("packages.title")} {t("how.intro")}</h2>
            </Reveal>
            <Reveal delay={160}>
              <ButtonLink href="/how-it-works" variant="outline-navy" className="mt-10">
                {t("nav.how")}
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ImagePlaceholder note={t("services.title")} ratio="4 / 3" tone="royal" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-site px-6 pb-[clamp(90px,10vw,150px)]">
          {c.packages.items.map((p, i) => (
            <PackageRow key={p.name} pkg={p} index={i} cta="/contact" />
          ))}
        </div>
      </section>

      <section className="bg-soft">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("how.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 text-h2 text-navy">{t("how.title")}</h2>
            </Reveal>
          </div>
          <div className="mt-14">
            <StepsGrid steps={c.how.steps} />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
