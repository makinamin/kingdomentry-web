import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/privacy", t("privacy.title"), t("privacy.intro"));
}

export default async function Privacy({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero title={t("privacy.title")} intro={t("privacy.intro")} crumbs={[{ label: t("footer.privacy") }]} />
      <section className="bg-mist py-[clamp(70px,8vw,120px)]">
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-6 px-6">
          {c.privacy.sections.map((s, i) => (
            <article key={s.title} className="flex gap-6 rounded-xl bg-white p-8 shadow-card">
              <span className="text-gradient text-[28px] font-black leading-none">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="m-0 text-[26px] font-black">{s.title}</h2>
                <p className="m-0 mt-3 text-[17px] leading-relaxed text-ink-3">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
