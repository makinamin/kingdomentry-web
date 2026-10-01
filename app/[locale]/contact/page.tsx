import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buttonClass } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { ArrowIcon } from "@/components/icons";
import { Label, RiseTitle, splitTitle } from "@/components/Label";
import { Reveal } from "@/components/Reveal";
import { SkylineLines } from "@/components/SkylineLines";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMeta(locale, "/contact", t("contact.seo.title"), t("contact.seo.description"));
}

/** Zeyna contact: royal left half with the big line and contact lines, white form card on the right. */
export default async function Contact({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = await getContent();

  return (
    <section className="relative isolate overflow-hidden bg-royal pb-[clamp(60px,7vw,110px)] pt-[clamp(140px,14vw,200px)] text-white">
      <SkylineLines className="-z-10 text-white" opacity={0.24} />
      <div className="mx-auto grid w-full max-w-site gap-14 px-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col">
          <Label tone="dark">{t("contact.label")}</Label>
          <RiseTitle as="h1" lines={splitTitle(t("contact.title"))} className="mt-6 text-display text-white" />
          <p className="m-0 mt-8 max-w-[40ch] text-[16px] leading-relaxed text-white/80">{t("contact.intro")}</p>

          <div className="mt-auto grid gap-8 pt-16 sm:grid-cols-2">
            {c.offices.items.map((o) => (
              <Reveal key={o.city} className="border-t border-white/25 pt-5">
                <p className="m-0 flex items-center gap-3 text-[13px] text-white/70">
                  <span aria-hidden className="h-2.5 w-2.5 border border-white/70" />
                  {o.city}
                </p>
                <p dir="auto" className="m-0 mt-2 text-start text-[15px] text-white">{o.phone}</p>
                <a href={`mailto:${o.email}`} className="mt-1 block text-[15px] text-white no-underline hover:text-white/75">
                  {o.email}
                </a>
              </Reveal>
            ))}
            <Reveal className="border-t border-white/25 pt-5">
              <p className="m-0 flex items-center gap-3 text-[13px] text-white/70">
                <span aria-hidden className="h-2.5 w-2.5 border border-white/70" />
                {t("footer.contact")}
              </p>
              <a href={`mailto:${site.email}`} className="mt-2 flex items-center gap-3 text-[16px] text-white no-underline hover:text-white/75">
                <ArrowIcon size={15} /> {site.email}
              </a>
            </Reveal>
          </div>
          <div id="book" className="mt-10 border border-white/25 p-6">
            <p className="m-0 text-h6 text-white">{t("contact.alt.title")}</p>
            <p className="m-0 mt-2 text-[15px] text-white/80">{t("contact.alt.text")}</p>
            {site.bookingUrl ? (
              <a href={site.bookingUrl} className={buttonClass("white", "mt-6")} target="_blank" rel="noopener noreferrer">
                {t("buttons.call")}
              </a>
            ) : (
              <div className="mt-6 flex min-h-[120px] items-center justify-center border border-dashed border-white/35 px-6 text-center text-[14px] text-white/70">
                {t("contact.calendar")}
              </div>
            )}
          </div>
        </div>
        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
