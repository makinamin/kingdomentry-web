import type React from "react";
import { SkylineLines } from "./SkylineLines";

/**
 * Stand-in for photography that has not arrived yet. Reserves the aspect ratio
 * so the real image causes no layout shift. The note says which photo goes here.
 */
export function ImagePlaceholder({
  note,
  ratio = "4 / 5",
  tone = "soft",
  className = "",
  fill,
}: {
  note: string;
  ratio?: string;
  tone?: "soft" | "royal" | "navy";
  className?: string;
  /**
   * Beside text in a grid: keep `ratio` while stacked, then from this breakpoint
   * drop the ratio and fill the column's height. Using a ratio together with
   * full height would make the box grow wider than its column.
   */
  fill?: "md" | "lg";
}) {
  const bg = {
    soft: "bg-[linear-gradient(180deg,theme(colors.soft),theme(colors.line))] text-royal",
    royal: "bg-[linear-gradient(180deg,theme(colors.royal.2),theme(colors.royal.DEFAULT))] text-white",
    navy: "bg-[linear-gradient(180deg,theme(colors.navy.2),theme(colors.navy.DEFAULT))] text-white",
  }[tone];
  const fillClass = {
    md: "[aspect-ratio:var(--ratio)] md:h-full md:min-h-[320px] md:[aspect-ratio:auto]",
    lg: "[aspect-ratio:var(--ratio)] lg:h-full lg:min-h-[320px] lg:[aspect-ratio:auto]",
  };
  return (
    <div
      role="img"
      aria-label={note}
      className={`relative isolate w-full overflow-hidden ${bg} ${fill ? fillClass[fill] : ""} ${className}`}
      style={fill ? ({ "--ratio": ratio } as React.CSSProperties) : { aspectRatio: ratio }}
    >
      <SkylineLines opacity={tone === "soft" ? 0.35 : 0.3} />
      <span
        className={`absolute bottom-4 start-4 px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-label ${
          tone === "soft" ? "bg-white text-navy/70" : "bg-white/10 text-white/80 backdrop-blur"
        }`}
      >
        {note}
      </span>
    </div>
  );
}
