import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Label } from "@/components/Label";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { bookingHref } from "@/lib/links";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/faq", t("faq.seo.title"), t("faq.seo.description"));
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  // FAQPage structured data for search engines.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero label={t("faq.label")} title={t("faq.title")} crumbs={[{ label: t("nav.faq") }]} />
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-[clamp(80px,9vw,140px)] lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Label>{t("faq.more")}</Label>
            <p className="m-0 mt-6 max-w-[52ch] text-[15px] leading-relaxed text-navy/70 lg:max-w-[30ch]">{t("contact.intro")}</p>
          </Reveal>
          <Faq items={c.faq.items} />
        </div>
      </section>
      <CtaBand title={t("faq.cta.title")} href={bookingHref} />
    </>
  );
}
