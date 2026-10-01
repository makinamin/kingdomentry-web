import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { LinkedInIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Label } from "@/components/Label";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SkylineLines } from "@/components/SkylineLines";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/about", t("about.title"), t.raw("about.story")[0] as string);
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();
  const [lead, ...rest] = c.about.story;

  return (
    <>
      <PageHero label={t("about.label")} title={t("about.title")} intro={t("team.text")} crumbs={[{ label: t("nav.about") }]} />

      {/* Three cities, Zeyna's three blue cards */}
      <section className="relative isolate overflow-hidden bg-royal text-white">
        <SkylineLines className="-z-10 text-white" opacity={0.18} />
        <div className="mx-auto grid w-full max-w-site gap-5 px-6 pb-[clamp(80px,9vw,130px)] pt-4 md:grid-cols-3">
          {c.contact.cities.map((city, i) => (
            <Reveal key={city.city} delay={i * 100} className="flex min-h-[300px] flex-col justify-between border border-white/25 bg-navy/30 p-7 backdrop-blur">
              <span className="text-h5">{city.city}</span>
              <span>
                {city.lines.map((l) => (
                  <span key={l} dir="auto" className="block text-start text-[14px] leading-relaxed text-white/75">
                    {l}
                  </span>
                ))}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-[clamp(90px,10vw,150px)] lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Label>{t("team.label")}</Label>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <p className="m-0 text-lead text-navy">{lead}</p>
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={p} delay={160 + i * 80}>
                <p className="m-0 mt-6 max-w-[56ch] text-[17px] leading-relaxed text-navy/70">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6">
          <Reveal>
            <ImagePlaceholder note={t("team.title")} ratio="21 / 9" tone="navy" />
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("about.teamLabel")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 text-h2 text-navy">{t("team.title")}</h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.about.members.map((m, i) => (
              <Reveal key={`${m.role}-${i}`} delay={i * 100} className="group">
                <div className="relative overflow-hidden">
                  <ImagePlaceholder note={m.photo} ratio="3 / 4" className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
                  {m.linkedin.startsWith("http") ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} ${m.linkedin}`}
                      className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center bg-white text-navy hover:bg-royal hover:text-white"
                    >
                      <LinkedInIcon />
                    </a>
                  ) : null}
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                  <span className="text-[18px] text-navy">{m.name}</span>
                  <span className="text-[13px] text-navy/60">{m.role}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
