import { useTranslations } from "next-intl";
import { ButtonLink } from "./Button";
import { DotGrid, Glow } from "./Glow";
import { ArrowIcon } from "./icons";
import { MarkShapes } from "./Logo";

export function NotFoundView() {
  const t = useTranslations("notFound");
  return (
    <section className="relative isolate flex min-h-[86vh] items-center overflow-hidden bg-night pb-24 pt-40 text-white">
      <Glow className="-start-32 top-20 h-[420px] w-[420px]" />
      <Glow tone="ember" className="-bottom-20 end-1/4 h-[260px] w-[260px] opacity-60" />
      <DotGrid className="inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <svg aria-hidden viewBox="0 0 120 120" className="pointer-events-none absolute -bottom-24 -end-24 h-[560px] w-[560px] text-white opacity-[0.06]">
        <MarkShapes mark="currentColor" diamond="currentColor" />
      </svg>
      <div className="relative mx-auto flex w-full max-w-site flex-col items-start px-6">
        <p aria-hidden className="text-stroke m-0 text-[clamp(110px,22vw,300px)] font-black leading-[0.9] text-white/70">
          {t("code")}
        </p>
        <h1 className="m-0 mt-6 max-w-[18ch] text-[clamp(32px,4.4vw,64px)] font-black leading-[1.08] !text-white">{t("title")}</h1>
        <ButtonLink href="/" className="mt-10">
          {t("link")} <ArrowIcon />
        </ButtonLink>
      </div>
    </section>
  );
}
