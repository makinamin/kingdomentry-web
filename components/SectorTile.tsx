import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { arrow } from "@/lib/dir";
import { SectorIcon, type SectorId } from "./SectorIcon";

export type Sector = { id: SectorId; name: string; tagline: string };

/** light: sectors index card. glass: immersive home tile. */
export function SectorTile({ sector, variant = "light" }: { sector: Sector; variant?: "light" | "glass" }) {
  const t = useTranslations();
  const locale = useLocale();

  if (variant === "glass") {
    return (
      <Link
        href={`/sectors/${sector.id}`}
        className="flex min-h-[220px] flex-col gap-[18px] rounded-lg border border-gold-light/[0.22] bg-pearl/[0.04] px-6 py-[30px] text-pearl no-underline backdrop-blur-[8px] transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-gold-light hover:bg-gold-light/[0.08] hover:text-pearl"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-light/40 bg-blue/60">
          <SectorIcon id={sector.id} size={36} />
        </span>
        <span className="mt-auto text-[25px] font-medium leading-[1.15]">{sector.name}</span>
        <span className="text-[12px] font-medium uppercase tracking-label text-horizon">{t("gateway.explore")}</span>
      </Link>
    );
  }

  return (
    <Link
      href={`/sectors/${sector.id}`}
      className="flex min-h-[260px] flex-col gap-5 rounded-md border border-stone/30 bg-white px-8 py-9 text-blue no-underline transition-colors hover:border-gold hover:text-blue"
    >
      <SectorIcon id={sector.id} size={48} />
      <h2 className="m-0 text-[32px] font-medium leading-[1.1]">{sector.name}</h2>
      <p className="m-0 text-pretty text-ink-soft">{sector.tagline}</p>
      <span className="mt-auto flex items-center gap-2 text-[15px] font-medium">
        {t("sectors.opportunity")} <span aria-hidden>{arrow(locale)}</span>
      </span>
    </Link>
  );
}
