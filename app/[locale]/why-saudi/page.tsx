import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Label } from "@/components/Label";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SkylineLines } from "@/components/SkylineLines";
import { getContent } from "@/lib/content";
import { bookingHref } from "@/lib/links";
import { pageMeta } from "@/lib/meta";
import { showPhotos } from "@/lib/photos";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/why-saudi", t("why.seo.title"), t("why.seo.description"));
}

export default async function WhySaudi({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero
        label={t("why.label")}
        title={t("why.title")}
        crumbs={[{ label: t("nav.why") }]}
        image={showPhotos(locale) ? "riyadh-skyline" : undefined}
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-[clamp(90px,10vw,150px)] lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Label>{t("why.introLabel")}</Label>
          </Reveal>
          <Reveal delay={100}>
            <p className="m-0 text-lead text-navy">{t("why.intro")}</p>
          </Reveal>
        </div>
      </section>

      {/* Five reasons as hairline rows */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-site px-6 pb-[clamp(90px,10vw,150px)]">
          <div className="mb-10 grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("why.reasons.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 max-w-[20ch] text-h3 text-navy">{t("why.reasons.title")}</h2>
            </Reveal>
          </div>
          <ol className="m-0 list-none border-t border-line p-0">
            {c.why.reasons.items.map((r, i) => (
              <Reveal key={r.name} as="li" delay={i * 70} className="grid gap-4 border-b border-line py-8 md:grid-cols-[100px_1fr_1.3fr] md:gap-10">
                <span className="text-[clamp(40px,3.6vw,60px)] font-light leading-none tracking-[-0.06em] text-royal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 text-h5 text-navy">{r.name}</h3>
                <p className="m-0 text-[16px] leading-relaxed text-navy/75">{r.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* The rules changed: a timeline */}
      <section className="bg-soft">
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label>{t("why.rules.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 max-w-[18ch] text-h2 text-navy">{t("why.rules.title")}</h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {c.why.rules.items.map((r, i) => (
              <Reveal key={r.name} delay={i * 90} className="flex h-full flex-col gap-5 bg-white p-[clamp(24px,3vw,40px)]">
                <span className="self-start border border-line px-3 py-1.5 text-[12px] uppercase tracking-label text-royal">{r.tag}</span>
                <h3 className="m-0 text-h5 text-navy">{r.name}</h3>
                <p className="m-0 text-[16px] leading-relaxed text-navy/75">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs and incentives on royal */}
      <section className="relative isolate overflow-hidden bg-royal text-white">
        <SkylineLines className="-z-10 text-white" opacity={0.18} />
        <div className="mx-auto w-full max-w-site px-6 py-[clamp(90px,10vw,150px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Label tone="dark">{t("why.programs.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="m-0 max-w-[18ch] text-h2 text-white">{t("why.programs.title")}</h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {c.why.programs.items.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} className="flex h-full flex-col gap-5 border border-white/25 bg-navy/30 p-[clamp(24px,3vw,40px)] backdrop-blur">
                <span className="text-[12px] text-white/60">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="m-0 text-h5 text-white">{p.name}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-white/85">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What this means */}
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site items-center gap-12 px-6 py-[clamp(90px,10vw,150px)] lg:grid-cols-2">
          <div>
            <Reveal>
              <Label>{t("why.means.label")}</Label>
            </Reveal>
            <Reveal delay={100}>
              <p className="m-0 mt-8 text-lead text-navy">{t("why.means.text")}</p>
              <p className="m-0 mt-8 text-h4 text-royal">{t("why.means.kicker")}</p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <ImagePlaceholder
              note={t("why.introLabel")}
              ratio="4 / 3"
              tone="royal"
              image={showPhotos(locale) ? "handshake" : undefined}
              alt={t("images.handshake")}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand title={t("why.cta.title")} button={t("buttons.call")} href={bookingHref} />
    </>
  );
}
