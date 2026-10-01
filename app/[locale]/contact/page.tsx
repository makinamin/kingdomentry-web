import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { MailIcon, PinIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/contact", t("contact.title"), t("contact.intro"));
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <>
      <PageHero label={t("contact.label")} title={t("contact.title")} intro={t("contact.intro")} crumbs={[{ label: t("nav.contact") }]} />
      <section className="bg-mist py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto grid w-full max-w-site gap-12 px-6 lg:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col gap-5">
            {c.contact.cities.map((city, i) => (
              <Reveal key={city.city} delay={i * 80} className="flex gap-5 rounded-xl bg-white p-7 shadow-card">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gd-violet text-white">
                  <PinIcon size={20} />
                </span>
                <div>
                  <h2 className="m-0 text-[24px] font-black">{city.city}</h2>
                  {city.lines.map((l) => (
                    <p key={l} dir="auto" className="m-0 mt-1 text-start text-[15.5px] leading-relaxed text-ink-3">
                      {l}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
            <Reveal delay={250}>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-xl bg-night p-7 text-[18px] font-bold text-white no-underline transition-colors hover:bg-gd-violet hover:text-white"
              >
                <MailIcon size={22} /> {site.email}
              </a>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex h-[180px] items-center justify-center rounded-xl border-2 border-dashed border-mist-line bg-white/50 px-6 text-center text-[15px] text-muted">
                {t("contact.calendar")}
              </div>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
