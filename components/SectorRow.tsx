import { useLocale, useTranslations } from "next-intl";
import { sectorPhotos, showPhotos } from "@/lib/photos";
import type { Sector } from "@/lib/types";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";
import { SectorIcon } from "./SectorIcon";

/** Zeyna projects-archive row: name, the Saudi demand, where you fit as chips, image beside it. */
export function SectorRow({ sector, index }: { sector: Sector; index: number }) {
  const t = useTranslations("sectors");
  const tImg = useTranslations("images");
  const image = showPhotos(useLocale()) ? sectorPhotos[sector.id] : undefined;
  return (
    <Reveal>
      <article id={sector.id} className="grid scroll-mt-28 bg-soft text-navy md:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col p-[clamp(24px,3vw,40px)]">
          <div className="flex items-start justify-between gap-6">
            <h3 className="m-0 text-h4 text-navy">{sector.name}</h3>
            <span className="text-royal">
              <SectorIcon id={sector.id} size={34} />
            </span>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="m-0 text-[12px] uppercase tracking-label text-navy/55">{t("demandLabel")}</p>
              <p className="m-0 mt-3 text-[16px] leading-relaxed text-navy">{sector.demand}</p>
            </div>
            <div>
              <p className="m-0 text-[12px] uppercase tracking-label text-navy/55">{t("fitLabel")}</p>
              <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
                {sector.fit.map((f) => (
                  <li key={f} className="border border-line bg-white px-3 py-1.5 text-[13px] text-navy">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <span className="mt-auto pt-10 text-[13px] text-navy/55">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <ImagePlaceholder
          note={sector.name}
          ratio="4 / 3"
          tone={index % 2 ? "navy" : "royal"}
          fill="md"
          image={image}
          alt={image ? tImg(sector.id as "healthcare") : undefined}
        />
      </article>
    </Reveal>
  );
}
