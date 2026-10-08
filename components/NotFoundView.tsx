import { useTranslations } from "next-intl";
import { ButtonLink } from "./Button";
import { SkylineLines } from "./SkylineLines";

export function NotFoundView() {
  const t = useTranslations("notFound");
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-royal pb-24 pt-40 text-white">
      <SkylineLines className="text-white" opacity={0.28} />
      <div className="relative mx-auto w-full max-w-site px-6">
        <p aria-hidden className="m-0 text-[clamp(120px,22vw,320px)] font-light leading-[0.85] tracking-[-0.08em] text-white/90">
          {t("code")}
        </p>
        <h1 className="m-0 mt-8 max-w-[18ch] text-h3 text-white">{t("title")}</h1>
        <ButtonLink href="/" className="mt-10">
          {t("link")}
        </ButtonLink>
      </div>
    </section>
  );
}
