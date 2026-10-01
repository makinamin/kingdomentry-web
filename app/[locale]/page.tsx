import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { DotGrid, Glow } from "@/components/Glow";
import { Eyebrow, Title } from "@/components/Heading";
import { HeroVisual } from "@/components/HeroVisual";
import { ArrowIcon, CheckIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Marquee } from "@/components/Marquee";
import { PackageCard } from "@/components/PackageCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { SectorCard } from "@/components/SectorCard";
import { StatCard } from "@/components/StatCard";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { ...pageMeta(locale, "/", t("hero.title"), t("hero.sub")), title: { absolute: `Kingdom Entry · ${t("hero.title")}` } };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();
  const cities = c.contact.cities.map((x) => x.city);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-night pb-[clamp(90px,10vw,150px)] pt-[clamp(150px,16vw,230px)] text-white">
        <Glow className="-start-32 top-24 h-[460px] w-[460px] opacity-70" />
        <Glow tone="ember" className="-bottom-24 -start-24 h-[260px] w-[260px]" />
        <Glow className="-end-20 bottom-0 h-[380px] w-[380px] opacity-50" />
        <DotGrid className="end-0 top-0 h-full w-[55%] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

        {/* Vertical contact rail */}
        <div className="absolute inset-y-0 start-6 hidden items-center min-[1400px]:flex">
          <div className="flex rotate-180 items-center gap-10 whitespace-nowrap [writing-mode:vertical-rl]">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-[15px] text-white/70 no-underline hover:text-white">
              <MailIcon className="rotate-90" /> {site.email}
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[15px] text-white/70 no-underline hover:text-white">
              <LinkedInIcon className="rotate-90" /> {t("footer.linkedin")}
            </a>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-site items-center gap-16 px-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col items-start">
            <Reveal>
              <Eyebrow tone="dark">{t("gateway.label")}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <Title as="h1" size="hero" tone="dark" accent="gradient-first" className="mt-4 max-w-[13ch]">
                {t("hero.title")}
              </Title>
            </Reveal>
            <Reveal delay={200}>
              <p className="m-0 mt-7 max-w-[46ch] text-[clamp(17px,1.4vw,20px)] leading-relaxed text-white/75">{t("hero.sub")}</p>
            </Reveal>
            <Reveal delay={300} className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact">
                {t("hero.cta1")} <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="outline">
                {t("hero.cta2")}
              </ButtonLink>
            </Reveal>
            <Reveal delay={400}>
              <p className="m-0 mt-12 flex items-center gap-4 text-[14px] font-semibold uppercase tracking-label text-white/60">
                <span aria-hidden className="h-px w-12 bg-gd-violet" />
                {t("hero.proof")}
              </p>
            </Reveal>
          </div>
          <Reveal delay={250}>
            <HeroVisual steps={c.how.steps} cities={cities} />
          </Reveal>
        </div>
      </section>

      <Marquee items={c.sectors.items.map((s) => s.name)} />

      {/* Who we are */}
      <section className="relative overflow-hidden bg-mist py-[clamp(80px,10vw,150px)]">
        <div className="mx-auto grid w-full max-w-site items-center gap-16 px-6 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-[560px]">
            <span aria-hidden className="absolute -inset-6 rounded-full border-[3px] border-mist-line" />
            <span aria-hidden className="absolute -inset-6 animate-spin-slow rounded-full border-[3px] border-dashed border-violet/30" />
            <ImagePlaceholder note={t("about.title")} ratio="1 / 1" rounded="rounded-full" />
            <span className="absolute bottom-8 end-0 flex items-center gap-3 rounded-full bg-white px-5 py-4 text-[15px] font-bold text-ink shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gd-violet text-white">
                <CheckIcon size={16} />
              </span>
              {t("hero.proof")}
            </span>
          </Reveal>
          <div className="flex flex-col items-start">
            <Reveal>
              <Eyebrow>{t("team.label")}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <Title accent="stroke-rest" className="mt-3">
                {t("team.title")}
              </Title>
            </Reveal>
            <Reveal delay={150}>
              <p className="m-0 mt-6 max-w-[52ch] text-[19px] leading-relaxed text-ink-3">{t("team.text")}</p>
            </Reveal>
            <ul className="m-0 mt-8 grid list-none gap-4 p-0">
              {c.whyNow.points.map((p, i) => (
                <Reveal key={p.title} as="li" delay={200 + i * 80} className="flex gap-4 rounded-xl bg-white p-5 shadow-card">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gd-violet text-white">
                    <CheckIcon size={16} />
                  </span>
                  <span>
                    <span className="block text-[19px] font-black text-ink">{p.title}</span>
                    <span className="mt-1 block text-[15.5px] leading-relaxed text-ink-3">{p.text}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={450} className="mt-10">
              <ButtonLink href="/about" variant="dark">
                {t("team.cta")} <ArrowIcon />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-white py-[clamp(80px,10vw,150px)]">
        <div className="mx-auto w-full max-w-site px-6">
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <Reveal>
              <Eyebrow>{t("gateway.packagesLabel")}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <Title className="mt-3">{t("gateway.packagesTitle")}</Title>
            </Reveal>
            <Reveal delay={150}>
              <p className="m-0 mt-5 text-[18px] text-ink-3">{t("services.intro")}</p>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-7 lg:grid-cols-3">
            {c.packages.items.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <PackageCard pkg={p} index={i} featured={i === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why now + sectors, one dark band */}
      <section className="relative isolate overflow-hidden bg-night-deep py-[clamp(80px,10vw,150px)] text-white">
        <Glow className="-end-40 top-20 h-[420px] w-[420px] opacity-60" />
        <Glow tone="ember" className="-start-32 bottom-1/3 h-[260px] w-[260px] opacity-40" />
        <div className="relative mx-auto w-full max-w-site px-6">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <Reveal>
                <Eyebrow tone="dark">{t("gateway.statsLabel")}</Eyebrow>
              </Reveal>
              <Reveal delay={100}>
                <Title tone="dark" accent="gradient-first" className="mt-3 max-w-[18ch]">
                  {t("gateway.statsTitle")}
                </Title>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <p className="m-0 max-w-[32ch] text-[15px] text-white/55">{t("gateway.statsNote")}</p>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {c.gateway.stats.map((s, i) => (
              <Reveal key={s.caption} delay={i * 80}>
                <StatCard {...s} />
              </Reveal>
            ))}
          </div>

          <div className="mt-[clamp(80px,10vw,140px)] flex flex-wrap items-end justify-between gap-8">
            <div>
              <Reveal>
                <Eyebrow tone="dark">{t("gateway.sectorsLabel")}</Eyebrow>
              </Reveal>
              <Reveal delay={100}>
                <Title tone="dark" className="mt-3">
                  {t("gateway.sectorsTitle")}
                </Title>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <ButtonLink href="/sectors" variant="outline">
                {t("sectorsStrip.all")} <ArrowIcon />
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {c.sectors.items.map((s, i) => (
              <Reveal key={s.id} delay={i * 80} className={`h-full ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}>
                <SectorCard sector={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-mist py-[clamp(80px,10vw,150px)]">
        <div className="mx-auto w-full max-w-site px-6">
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <Reveal>
              <Eyebrow>{t("how.label")}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <Title accent="stroke-rest" className="mt-3">
                {t("how.title")}
              </Title>
            </Reveal>
            <Reveal delay={150}>
              <p className="m-0 mt-5 text-[18px] text-ink-3">{t("how.intro")}</p>
            </Reveal>
          </div>
          <div className="mt-16">
            <ProcessSteps steps={c.how.steps} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
