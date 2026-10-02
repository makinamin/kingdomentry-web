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
import { founderLinks } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/about", t("about.seo.title"), t("about.seo.description"));
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();
  const [lead, ...rest] = c.about.story.paragraphs;

  return (
    <>
      <PageHero label={t("about.label")} title={t("about.title")} crumbs={[{ label: t("nav.about") }]} />

      {/* Our story */}
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-[clamp(90px,10vw,150px)] lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Label>{t("about.story.label")}</Label>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <p className="m-0 text-lead text-navy">{lead}</p>
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={p} delay={160 + i * 80}>
                <p className="m-0 mt-6 max-w-[60ch] text-[17px] leading-relaxed text-navy/75">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and vision on royal */}
      <section className="relative isolate overflow-hidden bg-royal text-white">
        <SkylineLines className="-z-10 text-white" opacity={0.18} />
        <div className="mx-auto grid w-full max-w-site gap-5 px-6 py-[clamp(80px,9vw,130px)] md:grid-cols-2">
          {(["mission", "vision"] as const).map((k, i) => (
            <Reveal key={k} delay={i * 100} className="flex flex-col justify-between gap-6 border md:min-h-[320px] md:gap-10 border-white/25 bg-navy/30 p-[clamp(24px,3vw,44px)] backdrop-blur">
              <Label tone="dark">{t(`about.${k}.label`)}</Label>
              <p className="m-0 text-h4 text-white">{t(`about.${k}.text`)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <Reveal>
            <Label>{t("about.values.label")}</Label>
          </Reveal>
          <div className="mt-10 grid border-s border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {c.about.values.items.map((v, i) => (
              <Reveal key={v.name} delay={i * 80} className="flex flex-col justify-between gap-5 border-b sm:min-h-[240px] sm:gap-8 border-e border-line p-7">
                <span className="text-[clamp(40px,3.4vw,56px)] font-light leading-none tracking-[-0.06em] text-royal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-h6 text-navy">{v.name}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-navy/70">{v.text}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="bg-soft">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("about.founders.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 max-w-[22ch] text-h2 text-navy">{t("about.founders.line")}</h2>
            </Reveal>
          </div>
          <div className="mt-[clamp(50px,6vw,90px)] flex flex-col gap-5">
            {c.about.founders.items.map((f, i) => {
              const link = founderLinks[i];
              return (
                <Reveal key={f.name}>
                  <article className="grid bg-white md:grid-cols-[minmax(240px,0.8fr)_2fr]">
                    <ImagePlaceholder note={`${t("about.founders.photo")}: ${f.name}`} ratio="4 / 3" tone={i ? "navy" : "royal"} fill="md" />
                    <div className="flex flex-col p-[clamp(24px,3.4vw,52px)]">
                      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
                        <div>
                          <h3 className="m-0 text-h4 text-navy">{f.name}</h3>
                          <p className="m-0 mt-2 text-[15px] text-navy/70">
                            {f.title} <span className="text-navy/40">|</span> {f.location}
                          </p>
                        </div>
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-line px-3 py-2 text-[12px] uppercase tracking-label text-navy no-underline hover:border-navy hover:text-navy"
                          >
                            <LinkedInIcon size={14} /> {t("about.founders.linkedin")}
                          </a>
                        ) : null}
                      </div>
                      {f.bio.map((p) => (
                        <p key={p} className="m-0 mt-5 text-[16px] leading-relaxed text-navy/80">
                          {p}
                        </p>
                      ))}
                      {f.quote ? (
                        <blockquote className="m-0 mt-8 border-s-2 border-royal ps-6">
                          <p className="m-0 text-h5 text-royal">{locale === "ar" ? <>&laquo;{f.quote}&raquo;</> : <>&ldquo;{f.quote}&rdquo;</>}</p>
                        </blockquote>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title={t("about.cta.title")} button={t("buttons.talk")} />
    </>
  );
}
