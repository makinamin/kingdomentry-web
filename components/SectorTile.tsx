import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { sectorPhotos, showPhotos } from "@/lib/photos";
import type { Sector } from "@/lib/types";
import { ArrowUpRight } from "./icons";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { SectorIcon } from "./SectorIcon";

/** Card for the sectors carousel: image, icon, name, the Saudi demand. */
export function SectorTile({ sector, index }: { sector: Sector; index: number }) {
  const t = useTranslations("sectors");
  const tImg = useTranslations("images");
  const image = showPhotos(useLocale()) ? sectorPhotos[sector.id] : undefined;
  return (
    <Link href={`/sectors#${sector.id}`} className="group flex h-full flex-col bg-white text-navy no-underline hover:text-navy">
      <div className="overflow-hidden">
        <ImagePlaceholder
          note={sector.name}
          image={image}
          alt={image ? tImg(sector.id as "healthcare") : undefined}
          sizes="300px"
          ratio="4 / 5"
          tone={index % 2 ? "navy" : "royal"}
          className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 border border-t-0 border-line p-6">
        <span className="flex items-center justify-between text-royal">
          <SectorIcon id={sector.id} size={30} />
          <span className="text-[12px] text-navy/50">{String(index + 1).padStart(2, "0")}</span>
        </span>
        <span className="text-h6 text-navy">{sector.name}</span>
        <span className="text-[14px] leading-relaxed text-navy/65">{sector.demand}</span>
        <span className="mt-auto flex items-center gap-2 pt-3 text-[12px] font-medium uppercase tracking-label">
          {t("fitLabel")} <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
