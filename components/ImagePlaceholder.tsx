import { color } from "@/lib/tokens";
import { MarkShapes } from "./Logo";

/**
 * Stand-in for photography that has not arrived yet. Reserves the aspect ratio
 * so the real image causes no layout shift. The note says what photo goes here.
 */
export function ImagePlaceholder({
  note,
  ratio = "4 / 5",
  tone = "light",
  className = "",
}: {
  note: string;
  ratio?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={note}
      className={`relative flex items-center justify-center overflow-hidden rounded-md ${
        dark
          ? "bg-[linear-gradient(180deg,theme(colors.blue.lift),theme(colors.blue.deep))]"
          : "border border-stone/30 bg-white"
      } ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <svg viewBox="0 0 120 120" aria-hidden className="h-[46%] w-[46%] opacity-[0.12]">
        <MarkShapes mark={dark ? color.pearl : color.blue} diamond={dark ? color.pearl : color.blue} />
      </svg>
      <span
        className={`absolute bottom-3 px-3 text-center text-[11px] tracking-label ${dark ? "text-horizon" : "text-stone"}`}
      >
        {note}
      </span>
    </div>
  );
}
