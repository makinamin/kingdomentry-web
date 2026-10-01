import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { EntryFinder } from "@/components/EntryFinder";
import { ArrowIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Label, RiseTitle, splitTitle } from "@/components/Label";
import { PackageRow } from "@/components/PackageRow";
import { Reveal } from "@/components/Reveal";
import { SectorTile } from "@/components/SectorTile";
import { SkylineLines } from "@/components/SkylineLines";
import { StepsGrid } from "@/components/StepsGrid";
import { Link } from "@/i18n/navigation";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

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
  const featured = c.packages.items[2];

  return (
    <>
      {/* Hero: centred title, entry finder, sub bottom-start, featured card bottom-end */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[linear-gradient(180deg,theme(colors.royal.2)_0%,theme(colors.royal.DEFAULT)_55%,theme(colors.navy.DEFAULT)_100%)] pt-[clamp(140px,14vw,200px)] text-white">
        <div className="absolute inset-0 -z-10 animate-drift">
          <SkylineLines className="text-white" opacity={0.24} />
        </div>
        <div className="mx-auto flex w-full max-w-site flex-col items-center px-6 text-center">
          <RiseTitle as="h1" lines={splitTitle(t("hero.title"))} className="text-display text-white" />
          <Reveal delay={350} className="mt-[clamp(40px,6vw,80px)] flex w-full justify-center">
            <EntryFinder />
          </Reveal>
        </div>
        <div className="mx-auto mt-auto grid w-full max-w-site items-end gap-8 px-6 pb-10 pt-20 lg:grid-cols-2">
          <Reveal delay={500}>
            <p className="m-0 max-w-[40ch] text-[14px] leading-relaxed text-white/80">{t("hero.sub")}</p>
            <p className="m-0 mt-4 text-[12px] uppercase tracking-label text-white/60">{t("hero.proof")}</p>
          </Reveal>
          {featured ? (
            <Reveal delay={600} className="lg:justify-self-end">
              <Link href="/services" className="group grid w-full max-w-[460px] grid-cols-[1fr_1.1fr] bg-white text-navy no-underline hover:text-navy">
                <div className="flex flex-col justify-between gap-6 p-5">
                  <span className="text-[12px] text-navy/60">{t("gateway.packagesLabel")}</span>
                  <span className="text-[12px] uppercase tracking-label text-navy/60">{featured.duration}</span>
                </div>
                <div className="flex flex-col gap-3 border-s border-line p-5">
                  <ImagePlaceholder note={featured.name} ratio="16 / 10" tone="royal" />
                  <span className="text-[16px] text-navy">{featured.name}</span>
                  <span className="flex items-center gap-2 text-[12px] text-navy/60">
                    {featured.includes.slice(0, 2).join(" · ")}
                  </span>
                </div>
              </Link>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Who we are */}
      <section className="relative isolate overflow-hidden bg-white">
        <SkylineLines className="-z-10 text-royal" opacity={0.16} />
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 pb-[clamp(120px,16vw,260px)] pt-[clamp(90px,10vw,150px)] lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Label>{t("team.label")}</Label>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <p className="m-0 text-lead text-navy">
                {t("team.title")} {t("team.text")}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <ButtonLink href="/about" variant="outline-navy" className="mt-10">
                {t("team.cta")}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Headline + why-now stats */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("gateway.statsLabel")}</Label>
            </Reveal>
            <div>
              <Reveal delay={100}>
                <h2 className="m-0 max-w-[18ch] text-h2 text-navy">{t("gateway.statsTitle")}</h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="m-0 mt-6 max-w-[52ch] text-[16px] leading-relaxed text-navy/70">{t("whyNow.title")}</p>
                <ButtonLink href="/services" variant="royal" className="mt-8">
                  {t("nav.services")}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="mt-[clamp(60px,7vw,100px)] grid grid-cols-2 border-s border-t border-line md:grid-cols-3 xl:grid-cols-5">
            {c.gateway.stats.map((s, i) => (
              <Reveal key={s.caption} delay={i * 80} className="flex min-h-[220px] flex-col justify-between gap-8 border-b border-e border-line p-6">
                <span className="text-[12px] text-navy/50">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block break-words text-h5 text-royal">{s.figure}</span>
                  <span className="mt-2 block text-[14px] leading-snug text-navy/70">{s.caption}</span>
                </span>
              </Reveal>
            ))}
          </div>
          <p className="m-0 mt-4 text-[12px] text-navy/50">{t("gateway.statsNote")}</p>
        </div>
      </section>

      {/* Sectors carousel */}
      <section className="bg-soft">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Reveal>
                <Label>{t("gateway.sectorsLabel")}</Label>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="m-0 mt-6 text-h2 text-navy">{t("gateway.sectorsTitle")}</h2>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <ButtonLink href="/sectors" variant="outline-navy">
                {t("sectorsStrip.all")}
              </ButtonLink>
            </Reveal>
          </div>
          <div className="-mx-6 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:thin]">
            {c.sectors.items.map((s, i) => (
              <Reveal key={s.id} delay={i * 80} className="w-[78vw] max-w-[320px] shrink-0 snap-start sm:w-[42vw] lg:w-auto lg:max-w-none lg:flex-1">
                <SectorTile sector={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages as featured rows */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="mb-[clamp(40px,5vw,70px)] grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("gateway.packagesLabel")}</Label>
            </Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <Reveal delay={100}>
                <h2 className="m-0 text-h2 text-navy">{t("gateway.packagesTitle")}</h2>
                <p className="m-0 mt-5 max-w-[50ch] text-[16px] leading-relaxed text-navy/70">{t("services.intro")}</p>
              </Reveal>
              <Reveal delay={150}>
                <ButtonLink href="/services" variant="royal">
                  {t("nav.services")}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          {c.packages.items.map((p, i) => (
            <PackageRow key={p.name} pkg={p} index={i} />
          ))}
        </div>
      </section>

      {/* How it works on royal */}
      <section className="relative isolate overflow-hidden bg-royal text-white">
        <SkylineLines className="-z-10 text-white" opacity={0.2} />
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label tone="dark">{t("how.label")}</Label>
            </Reveal>
            <div>
              <Reveal delay={100}>
                <h2 className="m-0 text-h2 text-white">{t("how.title")}</h2>
                <p className="m-0 mt-5 max-w-[46ch] text-[16px] text-white/80">{t("how.intro")}</p>
              </Reveal>
              <Reveal delay={160}>
                <ButtonLink href="/how-it-works" className="mt-8">
                  {t("hero.cta2")}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="mt-[clamp(56px,6vw,90px)]">
            <StepsGrid steps={c.how.steps} tone="dark" />
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site items-stretch gap-12 px-6 py-[clamp(90px,10vw,150px)] lg:grid-cols-2">
          <div className="flex flex-col">
            <Reveal>
              <Label>{t("about.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 mt-6 max-w-[16ch] text-h3 text-navy">{t("about.title")}</h2>
              <p className="m-0 mt-5 max-w-[46ch] text-[16px] leading-relaxed text-navy/70">{c.about.story[0]}</p>
            </Reveal>
            <ul className="m-0 mt-10 list-none border-t border-line p-0">
              {c.contact.cities.map((city, i) => (
                <Reveal key={city.city} as="li" delay={150 + i * 80} className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-5">
                  <span className="text-h5 text-navy">{city.city}</span>
                  <span dir="auto" className="text-[14px] text-navy/60">{city.lines[0]}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={400} className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-3 text-[13px] font-medium uppercase tracking-label text-navy no-underline hover:text-royal">
                {t("nav.contact")} <ArrowIcon size={15} />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <ImagePlaceholder note={t("hero.proof")} ratio="5 / 6" tone="navy" className="h-full" />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
