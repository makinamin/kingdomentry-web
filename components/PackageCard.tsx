import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckIcon, ArrowIcon } from "./icons";

export type Package = { name: string; duration: string; includes: string[]; outcome: string };

/** Gilroy feature box: white, 20px radius, gradient number disc. `featured` flips it dark. */
export function PackageCard({
  pkg,
  index,
  featured = false,
  detailed = false,
}: {
  pkg: Package;
  index: number;
  featured?: boolean;
  /** Services page: adds the full "What's included" list and outcome block. */
  detailed?: boolean;
}) {
  const t = useTranslations("packages");
  const dark = featured;

  return (
    <article
      className={`group relative flex h-full flex-col gap-7 overflow-hidden rounded-xl p-[clamp(28px,3.4vw,45px)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 ${
        dark ? "bg-night text-white shadow-glow" : "bg-white shadow-card"
      }`}
    >
      {dark ? (
        <span aria-hidden className="absolute -end-24 -top-24 h-64 w-64 rounded-full bg-violet/40 blur-[70px]" />
      ) : null}
      <div className="relative flex items-center justify-between gap-4">
        <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gd-violet text-[30px] font-black text-white transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`rounded-full px-4 py-2 text-[13px] font-semibold ${
            dark ? "bg-white/10 text-white" : "bg-mist text-ink"
          }`}
        >
          {pkg.duration}
        </span>
      </div>

      <h3 className={`relative m-0 text-[clamp(24px,2.2vw,30px)] font-black leading-[1.15] ${dark ? "!text-white" : ""}`}>
        {pkg.name}
      </h3>

      {detailed ? (
        <div className="relative flex flex-col gap-3">
          <p className={`m-0 text-[13px] font-semibold uppercase tracking-label ${dark ? "text-white/60" : "text-muted"}`}>
            {t("includesLabel")}
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {pkg.includes.map((inc) => (
              <li key={inc} className="flex items-start gap-3 text-[16px] leading-snug">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gd-violet text-white">
                  <CheckIcon size={11} />
                </span>
                <span className={dark ? "text-white/90" : "text-ink-2"}>{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={`relative ${detailed ? `border-t pt-6 ${dark ? "border-white/15" : "border-mist-line"}` : ""}`}>
        {detailed ? (
          <p className={`m-0 mb-2 text-[13px] font-semibold uppercase tracking-label ${dark ? "text-white/60" : "text-muted"}`}>
            {t("outcomeLabel")}
          </p>
        ) : null}
        <p className={`m-0 text-[17px] leading-relaxed ${dark ? "text-white/80" : "text-ink-3"} ${detailed ? "!text-[20px] font-bold !leading-snug" : ""} ${detailed && !dark ? "!text-ink" : ""} ${detailed && dark ? "!text-white" : ""}`}>
          {pkg.outcome}
        </p>
      </div>

      <Link
        href={detailed ? "/contact" : "/services"}
        className={`relative mt-auto inline-flex items-center gap-2 self-start text-[16px] font-bold no-underline ${
          dark ? "text-white hover:text-violet-2" : "text-ink hover:text-violet"
        }`}
      >
        {t("cta")}
        <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </Link>
    </article>
  );
}
