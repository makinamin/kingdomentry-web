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
}: {
  note: string;
  ratio?: string;
  tone?: "soft" | "royal" | "navy";
  className?: string;
}) {
  const bg = {
    soft: "bg-[linear-gradient(180deg,theme(colors.soft),theme(colors.line))] text-royal",
    royal: "bg-[linear-gradient(180deg,theme(colors.royal.2),theme(colors.royal.DEFAULT))] text-white",
    navy: "bg-[linear-gradient(180deg,theme(colors.navy.2),theme(colors.navy.DEFAULT))] text-white",
  }[tone];
  return (
    <div role="img" aria-label={note} className={`relative isolate overflow-hidden ${bg} ${className}`} style={{ aspectRatio: ratio }}>
      <SkylineLines opacity={tone === "soft" ? 0.35 : 0.3} />
      <span
        className={`absolute bottom-4 start-4 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-label ${
          tone === "soft" ? "bg-white text-navy/70" : "bg-white/10 text-white/80 backdrop-blur"
        }`}
      >
        {note}
      </span>
    </div>
  );
}
