import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Label } from "@/components/Label";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/offices", t("offices.seo.title"), t("offices.seo.description"));
}

export default async function Offices({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero label={t("offices.label")} title={t("offices.title")} intro={t("offices.intro")} crumbs={[{ label: t("nav.offices") }]} />
      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-site flex-col gap-5 px-6 py-[clamp(80px,9vw,140px)]">
          {c.offices.items.map((o, i) => (
            <Reveal key={o.city}>
              <article className={`grid bg-soft md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <ImagePlaceholder note={o.city} ratio="4 / 3" tone={i === 1 ? "navy" : "royal"} fill="md" />
                <div className="flex flex-col p-[clamp(24px,3.4vw,52px)]">
                  <Label>{o.role}</Label>
                  <h2 className="m-0 mt-6 text-h2 text-navy">{o.city}</h2>
                  <p className="m-0 mt-5 max-w-[52ch] text-[16px] leading-relaxed text-navy/75">{o.text}</p>
                  <dl className="m-0 mt-auto grid gap-0 border-t border-line pt-2 sm:grid-cols-2 [&>div:first-child]:sm:col-span-2">
                    {(
                      [
                        [t("offices.addressLabel"), o.address],
                        [t("offices.phoneLabel"), o.phone],
                        [t("offices.emailLabel"), o.email],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k} className="min-w-0 border-b border-line py-4 sm:pe-4">
                        <dt className="text-[12px] uppercase tracking-label text-navy/55">{k}</dt>
                        <dd dir="auto" className="m-0 mt-1 min-w-0 text-start text-[14px] text-navy [overflow-wrap:anywhere]">
                          {k === t("offices.emailLabel") ? (
                            <a href={`mailto:${v}`} className="inline-flex max-w-full items-center gap-2 text-navy no-underline hover:text-royal">
                              <ArrowIcon size={13} /> {v}
                            </a>
                          ) : (
                            v
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title={t("offices.cta.title")} button={t("buttons.touch")} />
    </>
  );
}
