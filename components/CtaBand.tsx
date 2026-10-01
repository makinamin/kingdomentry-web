import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { ButtonLink } from "./Button";
import { ArrowIcon } from "./icons";
import { Label } from "./Label";
import { Reveal } from "./Reveal";

/** "Request a demo" band: navy text on soft ground, big statement, contact lines. Not on contact, privacy or 404. */
export function CtaBand() {
  const t = useTranslations();
  return (
    <section className="border-t border-line bg-soft">
      <div className="mx-auto grid w-full max-w-site gap-12 px-6 py-[clamp(80px,9vw,140px)] lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <Label>{t("contact.label")}</Label>
          <p className="m-0 mt-6 max-w-[34ch] text-[15px] leading-relaxed text-navy/70">{t("contact.intro")}</p>
          <a href={`mailto:${site.email}`} className="mt-10 flex items-center gap-3 text-[18px] text-navy no-underline hover:text-royal">
            <ArrowIcon size={16} /> {site.email}
          </a>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="m-0 text-h2 text-navy">{t("ctaBand.title")}</h2>
          <ButtonLink href="/contact" variant="royal" className="mt-10">
            {t("ctaBand.cta")}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
