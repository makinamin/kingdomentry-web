import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Sector } from "@/lib/types";
import { ArrowUpRight } from "./icons";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";
import { SectorIcon } from "./SectorIcon";

/** Zeyna projects-archive row: title and tag chips on a soft panel, image beside it. */
export function SectorRow({ sector, index }: { sector: Sector; index: number }) {
  const t = useTranslations("sectors");
  return (
    <Reveal>
      <Link href={`/sectors/${sector.id}`} className="group grid bg-soft text-navy no-underline hover:text-navy md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col p-[clamp(24px,3vw,40px)]">
          <div className="flex items-start justify-between gap-6">
            <h2 className="m-0 text-h4 text-navy">{sector.name}</h2>
            <span className="flex items-center gap-2 text-royal">
              <SectorIcon id={sector.id} size={30} />
            </span>
          </div>
          <p className="m-0 mt-3 max-w-[44ch] text-[15px] text-navy/70">{sector.tagline}</p>
          <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0">
            {sector.buyers.map((b) => (
              <li key={b} className="border border-line bg-white px-3 py-1.5 text-[12px] text-navy/80">
                {b}
              </li>
            ))}
          </ul>
          <span className="mt-auto flex items-center justify-between gap-4 pt-10 text-[13px]">
            <span className="text-navy/55">{String(index + 1).padStart(2, "0")}</span>
            <span className="flex items-center gap-2 font-medium uppercase tracking-label">
              {t("opportunity")}
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </span>
        </div>
        <div className="overflow-hidden">
          <ImagePlaceholder
            note={sector.name}
            ratio="4 / 3"
            tone={index % 2 ? "navy" : "royal"}
            className="h-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>
    </Reveal>
  );
}
