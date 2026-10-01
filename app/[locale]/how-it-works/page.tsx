import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow, Title } from "@/components/Heading";
import { ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
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
      <section className="relative isolate overflow-hidden bg-night-deep py-[clamp(80px,10vw,140px)] text-white">
        <span aria-hidden className="absolute -end-40 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-violet/40 blur-[90px]" />
        <div className="mx-auto w-full max-w-site px-6">
          <ProcessSteps steps={c.how.steps} tone="dark" />
        </div>
      </section>
      <section className="bg-mist py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-full max-w-site px-6">
          <Reveal>
            <Eyebrow>{t("packages.label")}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <Title className="mt-3">{t("packages.title")}</Title>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.packages.items.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <Link
                  href="/services"
                  className="group flex h-full items-center justify-between gap-6 rounded-xl bg-white p-8 text-ink no-underline shadow-card transition-colors duration-500 hover:bg-night hover:text-white"
                >
                  <span>
                    <span className="block text-[14px] font-semibold text-muted group-hover:text-white/60">{p.duration}</span>
                    <span className="mt-2 block text-[24px] font-black leading-tight">{p.name}</span>
                  </span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gd-violet text-white transition-transform duration-500 group-hover:rotate-45 rtl:group-hover:-rotate-45">
                    <ArrowUpRight />
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
