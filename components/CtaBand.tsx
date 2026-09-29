import { useTranslations } from "next-intl";
import { ButtonLink } from "./Button";
import { DiamondPattern } from "./DiamondPattern";
import { OversizedMark } from "./OversizedMark";

/** Blue band before the footer. Not on contact, privacy or 404. */
export function CtaBand() {
  const t = useTranslations("ctaBand");
  return (
    <section className="relative overflow-hidden border-t border-gold/40 bg-blue text-pearl">
      <DiamondPattern opacity={0.4} />
      <OversizedMark className="-top-[120px] -start-[160px] h-[520px] w-[520px]" />
      <div className="relative mx-auto flex w-full max-w-site flex-col items-center gap-8 px-6 py-[clamp(72px,9vw,128px)] text-center">
        <h2 className="m-0 max-w-[22ch] text-balance text-[clamp(34px,4.6vw,62px)] font-medium leading-[1.06]">
          {t("title")}
        </h2>
        <ButtonLink href="/contact" variant="gold">
          {t("cta")}
        </ButtonLink>
      </div>
    </section>
  );
}
