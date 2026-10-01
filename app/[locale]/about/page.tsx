import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow, Title } from "@/components/Heading";
import { LinkedInIcon, PinIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Marquee } from "@/components/Marquee";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
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
      <PageHero label={t("about.label")} title={t("about.title")} crumbs={[{ label: t("nav.about") }]} />
      <section className="bg-mist py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto grid w-full max-w-site items-center gap-16 px-6 lg:grid-cols-2">
          <Reveal className="relative">
            <ImagePlaceholder note={t("team.title")} ratio="5 / 6" />
            <div className="absolute -bottom-8 end-6 rounded-xl bg-gd-violet p-7 text-white shadow-glow sm:end-[-24px]">
              <p className="m-0 text-[14px] font-semibold uppercase tracking-label text-white/75">{t("team.label")}</p>
              <p className="m-0 mt-2 max-w-[16ch] text-[22px] font-black leading-tight">{t("team.title")}</p>
            </div>
          </Reveal>
          <div className="flex flex-col">
            <Reveal>
              <Eyebrow>{t("about.label")}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <p className="m-0 mt-4 text-[clamp(24px,2.6vw,36px)] font-black leading-[1.25] text-ink">{lead}</p>
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={p} delay={150 + i * 80}>
                <p className="m-0 mt-6 text-[19px] leading-relaxed text-ink-3">{p}</p>
              </Reveal>
            ))}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {c.contact.cities.map((city, i) => (
                <Reveal key={city.city} delay={250 + i * 80} className="rounded-xl bg-white p-5 shadow-card">
                  <PinIcon className="text-violet" />
                  <p className="m-0 mt-3 text-[18px] font-black text-ink">{city.city}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee items={c.contact.cities.map((x) => x.city)} />

      <section className="bg-white py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-full max-w-site px-6">
          <Reveal>
            <Eyebrow>{t("about.teamLabel")}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <Title accent="stroke-rest" className="mt-3">
              {t("team.title")}
            </Title>
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {c.about.members.map((m, i) => (
              <Reveal key={`${m.role}-${i}`} delay={i * 100} className="group">
                <div className="relative overflow-hidden rounded-xl">
                  <ImagePlaceholder note={m.photo} ratio="4 / 5" className="transition-transform duration-700 ease-out group-hover:scale-105" />
                  {m.linkedin.startsWith("http") ? (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} ${m.linkedin}`}
                    className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-opacity duration-300 hover:bg-gd-violet hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <LinkedInIcon />
                  </a>
                  ) : null}
                </div>
                <p className="m-0 mt-5 text-[22px] font-black text-ink">{m.name}</p>
                <p className="m-0 mt-1 text-[15px] text-muted">{m.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
