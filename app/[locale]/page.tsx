import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { EntryFinder } from "@/components/EntryFinder";
import { ArrowUpRight } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Label, RiseTitle, splitTitle } from "@/components/Label";
import { Reveal } from "@/components/Reveal";
import { SectorTile } from "@/components/SectorTile";
import { SkylineLines } from "@/components/SkylineLines";
import { StepsGrid } from "@/components/StepsGrid";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { bookingHref } from "@/lib/links";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/", t("home.seo.title"), t("home.seo.description"));
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[linear-gradient(180deg,theme(colors.royal.2)_0%,theme(colors.royal.DEFAULT)_55%,theme(colors.navy.DEFAULT)_100%)] pt-[clamp(140px,14vw,200px)] text-white">
        <div className="absolute inset-0 -z-10 animate-drift">
          <SkylineLines className="text-white" opacity={0.24} />
        </div>
        <div className="mx-auto flex w-full max-w-site flex-col items-center px-6 text-center">
          <RiseTitle as="h1" lines={splitTitle(t("home.hero.title"))} className="text-display text-white" />
          <div className="mt-[clamp(40px,5vw,72px)] flex w-full justify-center">
            <EntryFinder />
          </div>
        </div>
        <div className="mx-auto mt-auto grid w-full max-w-site items-end gap-8 px-6 pb-10 pt-20 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="m-0 max-w-[52ch] text-[15px] leading-relaxed text-white/85">{t("home.hero.sub")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={bookingHref} variant="white">
                {t("buttons.readiness")}
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                {t("buttons.explore")}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:justify-self-end">
            <Link href="/offices" className="group grid w-full max-w-[460px] grid-cols-[1fr_1.15fr] bg-white text-navy no-underline hover:text-navy">
              <div className="flex flex-col justify-between gap-6 p-5">
                <span className="text-[12px] text-navy/60">{t("home.proof.label")}</span>
                <span className="text-[12px] uppercase tracking-label text-navy/60">{t("footer.cities")}</span>
              </div>
              <div className="flex flex-col gap-3 border-s border-line p-5">
                <ImagePlaceholder note={c.offices.items[2]?.city ?? ""} ratio="16 / 10" tone="royal" />
                <span className="text-[16px] leading-snug text-navy">{t("home.proof.title")}</span>
                <span className="flex items-center gap-2 text-[12px] uppercase tracking-label text-navy/60">
                  {t("nav.offices")} <ArrowUpRight size={12} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why KingdomEntry */}
      <section className="relative isolate overflow-hidden bg-white">
        <SkylineLines className="-z-10 text-royal" opacity={0.14} />
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 pb-[clamp(110px,14vw,220px)] pt-[clamp(90px,10vw,150px)] lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Label>{t("home.intro.label")}</Label>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <p className="m-0 text-lead text-navy">{t("home.intro.text")}</p>
            </Reveal>
            <Reveal delay={180}>
              <ul className="m-0 mt-10 flex list-none flex-wrap gap-2 p-0">
                {c.home.intro.pains.map((p) => (
                  <li key={p} className="border border-line bg-white px-4 py-2 text-[14px] text-navy">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-4 text-[15px] text-navy/60">{t("home.intro.painsLine")}</p>
            </Reveal>
            <Reveal delay={240}>
              <p className="m-0 mt-10 max-w-[30ch] text-h5 text-royal">{t("home.intro.resolve")}</p>
              <ButtonLink href="/about" variant="outline-navy" className="mt-10">
                {t("buttons.about")}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("home.pillars.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 max-w-[18ch] text-h2 text-navy">{t("home.pillars.title")}</h2>
            </Reveal>
          </div>
          <div className="mt-[clamp(50px,6vw,90px)]">
            <StepsGrid steps={c.home.pillars.items} />
          </div>
        </div>
      </section>

      {/* Proof bar */}
      <section className="relative isolate overflow-hidden bg-royal text-white">
        <SkylineLines className="-z-10 text-white" opacity={0.16} />
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-[clamp(70px,8vw,110px)] lg:grid-cols-3 lg:gap-0">
          <Reveal className="lg:border-e lg:border-white/25 lg:pe-10">
            <p className="m-0 text-h4 text-white">{t("home.proof.title")}</p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col justify-end lg:border-e lg:border-white/25 lg:px-10">
            <Label tone="dark">{t("nav.offices")}</Label>
            <p className="m-0 mt-4 text-h6 text-white">{t("home.proof.cities")}</p>
          </Reveal>
          <Reveal delay={200} className="flex flex-col justify-end lg:ps-10">
            <Label tone="dark">{t("about.founders.label")}</Label>
            <p className="m-0 mt-4 text-[16px] leading-relaxed text-white/85">{t("home.proof.founders")}</p>
          </Reveal>
        </div>
      </section>

      {/* Why now */}
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-[clamp(90px,10vw,150px)] lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Label>{t("home.whyNow.label")}</Label>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <h2 className="m-0 text-h2 text-navy">{t("home.whyNow.title")}</h2>
              <p className="m-0 mt-6 max-w-[58ch] text-[17px] leading-relaxed text-navy/75">{t("home.whyNow.text")}</p>
            </Reveal>
            <Reveal delay={180}>
              <blockquote className="m-0 mt-12 border-s-2 border-royal ps-8">
                <p className="m-0 max-w-[28ch] text-h4 text-royal">{t("home.whyNow.kicker")}</p>
              </blockquote>
              <ButtonLink href="/why-saudi" variant="royal" className="mt-10">
                {t("buttons.why")}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sectors carousel */}
      <section className="bg-soft">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Reveal>
                <Label>{t("home.sectors.label")}</Label>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="m-0 mt-6 max-w-[20ch] text-h2 text-navy">{t("home.sectors.title")}</h2>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <ButtonLink href="/sectors" variant="outline-navy">
                {t("buttons.sectors")}
              </ButtonLink>
            </Reveal>
          </div>
          <div className="-mx-6 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:thin]">
            {c.sectors.items.map((s, i) => (
              <Reveal key={s.id} delay={Math.min(i, 5) * 70} className="w-[76vw] max-w-[300px] shrink-0 snap-start sm:w-[40vw] lg:w-[23%]">
                <SectorTile sector={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("home.services.label")}</Label>
            </Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <Reveal delay={100}>
                <h2 className="m-0 max-w-[18ch] text-h2 text-navy">{t("home.services.title")}</h2>
              </Reveal>
              <Reveal delay={150}>
                <ButtonLink href="/services" variant="royal">
                  {t("buttons.explore")}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="mt-[clamp(50px,6vw,90px)] grid border-s border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {c.services.items.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 70} className="border-b border-e border-line">
                <Link href="/services" className="group flex h-full min-h-[200px] flex-col justify-between gap-8 p-6 text-navy no-underline transition-colors duration-500 hover:bg-royal hover:text-white">
                  <span className="flex items-center justify-between text-[12px] opacity-60">
                    {String(i + 1).padStart(2, "0")}
                    <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  <span>
                    <span className="block text-[19px] leading-snug">{s.name}</span>
                    <span className="mt-2 block text-[14px] opacity-65">{s.tagline}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work on royal */}
      <section className="relative isolate overflow-hidden bg-royal text-white">
        <SkylineLines className="-z-10 text-white" opacity={0.18} />
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label tone="dark">{t("home.how.label")}</Label>
            </Reveal>
            <div>
              <Reveal delay={100}>
                <h2 className="m-0 max-w-[18ch] text-h2 text-white">{t("home.how.title")}</h2>
                <p className="m-0 mt-5 max-w-[48ch] text-[16px] text-white/85">{t("how.intro")}</p>
              </Reveal>
              <Reveal delay={160}>
                <ButtonLink href="/how-we-work" className="mt-8">
                  {t("buttons.how")}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="mt-[clamp(56px,6vw,90px)]">
            <StepsGrid steps={c.how.steps} tone="dark" />
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site items-stretch gap-12 px-6 py-[clamp(90px,10vw,150px)] lg:grid-cols-2">
          <div className="flex flex-col">
            <Reveal>
              <Label>{t("home.serve.label")}</Label>
            </Reveal>
            <ul className="m-0 mt-8 list-none border-t border-line p-0">
              {c.home.serve.items.map((s, i) => (
                <Reveal key={s} as="li" delay={100 + i * 80} className="flex items-baseline gap-6 border-b border-line py-6">
                  <span className="w-8 shrink-0 text-[13px] text-navy/45">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-h5 text-navy">{s}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={450}>
              <p className="m-0 mt-8 max-w-[44ch] text-[16px] leading-relaxed text-navy/70">{t("home.serve.note")}</p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <ImagePlaceholder note={t("footer.cities")} ratio="5 / 6" tone="navy" fill="lg" />
          </Reveal>
        </div>
      </section>

      <CtaBand title={t("home.cta.title")} href={bookingHref} />
    </>
  );
}
