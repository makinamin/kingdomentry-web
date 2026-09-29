import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { color } from "@/lib/tokens";
import { ButtonLink } from "./Button";
import { Diamond, DiamondList } from "./Diamond";

export type Package = { name: string; duration: string; includes: string[]; outcome: string };

type Props = {
  pkg: Package;
  index: number;
  /** light: services page. glass / raised: immersive home (raised is the centre card). */
  variant?: "light" | "glass" | "raised";
};

// Ring arc lengths out of a 377 circumference, one per package.
const ARC = [110, 220, 377];

export function PackageCard({ pkg, index, variant = "light" }: Props) {
  const t = useTranslations("packages");

  if (variant === "light") {
    return (
      <article className="flex flex-col gap-6 rounded-md border border-stone/30 bg-white px-8 py-10">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12px] font-medium uppercase tracking-label text-ink-soft">{pkg.duration}</span>
          <Diamond size={9} />
        </div>
        <h2 className="m-0 text-[36px] font-medium leading-[1.08]">{pkg.name}</h2>
        <div className="flex flex-col gap-3">
          <p className="m-0 text-[12px] font-medium uppercase tracking-label text-ink-soft">{t("includesLabel")}</p>
          <DiamondList items={pkg.includes} />
        </div>
        <div className="mt-auto flex flex-col gap-2 border-t border-stone/30 pt-5">
          <p className="m-0 text-[12px] font-medium uppercase tracking-label text-ink-soft">{t("outcomeLabel")}</p>
          <p className="m-0 text-pretty text-[22px] font-medium leading-[1.3]">{pkg.outcome}</p>
        </div>
        <ButtonLink href="/contact" variant="blue" className="self-start">
          {t("cta")}
        </ButtonLink>
      </article>
    );
  }

  const raised = variant === "raised";
  const gradientId = `ke-sheen-${index}`;

  return (
    <article
      className={`relative flex flex-col items-center gap-[22px] rounded-lg border px-8 pb-9 pt-11 text-center backdrop-blur-[10px] ${
        raised
          ? "border-gold-light/60 bg-[linear-gradient(180deg,rgba(26,82,199,0.9),rgba(3,60,178,0.6))] shadow-raised"
          : "border-gold-light/20 bg-pearl/[0.03]"
      }`}
    >
      <div className="relative flex h-[132px] w-[132px] items-center justify-center">
        <svg viewBox="0 0 132 132" width="132" height="132" aria-hidden className="absolute inset-0">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={color["gold-light"]} />
              <stop offset="1" stopColor={color.gold} />
            </linearGradient>
          </defs>
          <circle cx="66" cy="66" r="60" fill="none" className="stroke-horizon/25" strokeWidth="2" />
          <circle
            cx="66"
            cy="66"
            r="60"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${ARC[index] ?? 377} 377`}
            transform="rotate(-90 66 66)"
          />
        </svg>
        <span className="text-[40px] font-light leading-none text-gold-light">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="m-0 text-[12px] font-medium uppercase tracking-label text-horizon">{pkg.duration}</p>
      <h3 className="m-0 text-[30px] font-medium leading-[1.1]">{pkg.name}</h3>
      <p className="m-0 max-w-[30ch] text-pretty text-[15.5px] font-light leading-[1.7] text-pearl">{pkg.outcome}</p>
      <Link
        href="/services"
        className="mt-auto border-b border-gold-light/50 pb-1 text-[13px] font-medium uppercase tracking-label text-gold-light no-underline hover:text-pearl"
      >
        {t("cta")}
      </Link>
    </article>
  );
}
