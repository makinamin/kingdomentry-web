import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { ArrowUpRight } from "@/components/icons";
import { Label } from "@/components/Label";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StepsGrid } from "@/components/StepsGrid";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/how-it-works", t("how.title"), t("how.intro"));
}

export default async function HowItWorks({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero label={t("how.label")} title={t("how.title")} intro={t("how.intro")} crumbs={[{ label: t("nav.how") }]} />
      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <StepsGrid steps={c.how.steps} />
        </div>
      </section>
      <section className="bg-soft">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("packages.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 text-h2 text-navy">{t("packages.title")}</h2>
            </Reveal>
          </div>
          <div className="mt-14 grid border-s border-t border-line md:grid-cols-3">
            {c.packages.items.map((p, i) => (
              <Reveal key={p.name} delay={i * 100} className="border-b border-e border-line">
                <Link href="/services" className="group flex h-full min-h-[260px] flex-col justify-between gap-10 bg-white p-8 text-navy no-underline transition-colors duration-500 hover:bg-royal hover:text-white">
                  <span className="flex items-center justify-between text-[12px] uppercase tracking-label opacity-60">
                    {p.duration}
                    <ArrowUpRight size={16} />
                  </span>
                  <span>
                    <span className="block text-[clamp(48px,4vw,64px)] font-light leading-none tracking-[-0.06em] text-royal transition-colors group-hover:text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-4 block text-h5">{p.name}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
