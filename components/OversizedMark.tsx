import { color } from "@/lib/tokens";
import { MarkShapes } from "./Logo";

/** Embossed K at 14 to 16% used behind CTA band, 404 and hero sections. Position with className. */
export function OversizedMark({ className, opacity = 0.14 }: { className: string; opacity?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={`pointer-events-none absolute ${className}`} style={{ opacity }}>
      <MarkShapes mark={color.gold} diamond={color.gold} />
    </svg>
  );
}
