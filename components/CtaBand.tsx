import { useTranslations } from "next-intl";
import { ButtonLink } from "./Button";
import { DotGrid, Glow } from "./Glow";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";

/** Rounded violet block before the footer. Not on contact, privacy or 404. */
export function CtaBand() {
  const t = useTranslations("ctaBand");
  return (
    <section className="relative bg-mist px-6 pb-0 pt-[clamp(70px,8vw,120px)]">
      <Reveal className="relative mx-auto max-w-site">
        <div className="relative isolate overflow-hidden rounded-2xl bg-gd-violet px-[clamp(28px,6vw,90px)] py-[clamp(56px,7vw,100px)] text-white">
          <Glow tone="ember" className="-bottom-32 -end-20 h-80 w-80 opacity-70" />
          <DotGrid className="inset-y-0 start-0 w-1/2 opacity-60 [mask-image:linear-gradient(to_right,black,transparent)]" />
          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <h2 className="m-0 max-w-[18ch] text-balance text-[clamp(30px,4vw,56px)] font-black leading-[1.1] !text-white">
              {t("title")}
            </h2>
            <ButtonLink href="/contact" variant="light" className="shrink-0">
              {t("cta")} <ArrowIcon />
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
