import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { ButtonLink } from "./Button";
import { ArrowIcon } from "./icons";
import { Label } from "./Label";
import { Reveal } from "./Reveal";

/** Closing band: big statement, one button, contact lines. Not on contact, privacy or 404. */
export function CtaBand({ title, button, href = "/contact" }: { title: string; button?: string; href?: string }) {
  const t = useTranslations();
  return (
    <section className="border-t border-line bg-soft">
      <div className="mx-auto grid w-full max-w-site gap-12 px-6 py-[clamp(80px,9vw,140px)] lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <Label>{t("nav.contact")}</Label>
          <p className="m-0 mt-6 max-w-[34ch] text-[15px] leading-relaxed text-navy/70">{t("contact.alt.text")}</p>
          <a href={`mailto:${site.email}`} className="mt-10 flex items-center gap-3 text-[18px] text-navy no-underline hover:text-royal">
            <ArrowIcon size={16} /> {site.email}
          </a>
          <p className="m-0 mt-3 text-[13px] uppercase tracking-label text-navy/55">{t("footer.cities")}</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="m-0 max-w-[20ch] text-h2 text-navy">{title}</h2>
          <ButtonLink href={href} variant="royal" className="mt-10">
            {button ?? t("buttons.readiness")}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
