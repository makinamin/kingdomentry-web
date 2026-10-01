import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "./icons";
import { SectorIcon, type SectorId } from "./SectorIcon";

export type Sector = {
  id: SectorId;
  name: string;
  tagline: string;
  opportunity: string;
  buyers: string[];
  help: string[];
};

/**
 * dark: home grid on near-black. Gradient floods in on hover.
 * light: sectors index, white card.
 */
export function SectorCard({ sector, index, tone = "dark" }: { sector: Sector; index: number; tone?: "dark" | "light" }) {
  const t = useTranslations("gateway");
  const dark = tone === "dark";

  return (
    <Link
      href={`/sectors/${sector.id}`}
      className={`group relative isolate flex h-full min-h-[340px] flex-col overflow-hidden rounded-xl p-8 no-underline transition-transform duration-500 ease-out hover:-translate-y-2 ${
        dark ? "border border-white/10 bg-night-soft text-white hover:text-white" : "bg-white text-ink shadow-card hover:text-white"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gd-violet transition-transform duration-500 ease-out group-hover:scale-y-100"
      />
      <div className="flex items-start justify-between">
        <span
          className={`flex h-[76px] w-[76px] items-center justify-center rounded-full transition-colors duration-500 ${
            dark ? "bg-white text-violet" : "bg-mist text-violet group-hover:bg-white"
          }`}
        >
          <SectorIcon id={sector.id} size={40} />
        </span>
        <span className={`text-[15px] font-bold ${dark ? "text-white/40" : "text-muted"} group-hover:text-white/80`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className={`m-0 mt-auto pt-10 text-[clamp(24px,2vw,28px)] font-black leading-[1.15] ${dark ? "!text-white" : "group-hover:!text-white"}`}>
        {sector.name}
      </h3>
      <p className={`m-0 mt-3 text-[16px] leading-relaxed ${dark ? "text-white/65" : "text-ink-3"} group-hover:text-white/90`}>
        {sector.tagline}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-bold">
        {t("explore")}
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:rotate-45 rtl:group-hover:-rotate-45">
          <ArrowUpRight size={16} />
        </span>
      </span>
    </Link>
  );
}
