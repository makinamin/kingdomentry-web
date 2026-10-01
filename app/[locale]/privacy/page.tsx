import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/privacy", t("privacy.seo.title"), t("privacy.seo.description"));
}

export default async function Privacy({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero title={t("privacy.title")} intro={t("privacy.intro")} crumbs={[{ label: t("footer.privacy") }]} />
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[920px] px-6 py-[clamp(70px,8vw,120px)]">
          {c.privacy.sections.map((s, i) => (
            <article key={s.title} className="grid gap-4 border-t border-line py-10 sm:grid-cols-[80px_1fr]">
              <span className="text-[13px] text-navy/50">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="m-0 text-h5 text-navy">{s.title}</h2>
                <p className="m-0 mt-3 text-[16px] leading-relaxed text-navy/75">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
