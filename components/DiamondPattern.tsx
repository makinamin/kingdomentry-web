import { useId } from "react";
import { color } from "@/lib/tokens";

/**
 * "The Diamond Path": a 48px tile with one 6px gold diamond per cell and
 * 3.5px corner diamonds at 55%. Inline SVG, never a raster.
 * Fills its nearest positioned ancestor.
 */
export function DiamondPattern({ opacity, className }: { opacity: number; className?: string }) {
  const id = `diamond-path-${useId().replace(/:/g, "")}`;
  const gold = color.gold;
  const corners: Array<[number, number]> = [
    [0, 0],
    [48, 48],
    [48, 0],
    [0, 48],
  ];

  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    >
      <defs>
        <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
          <rect x="21" y="21" width="6" height="6" transform="rotate(45 24 24)" fill={gold} />
          {corners.map(([cx, cy]) => (
            <rect
              key={`${cx}-${cy}`}
              x={cx - 1.75}
              y={cy - 1.75}
              width="3.5"
              height="3.5"
              transform={`rotate(45 ${cx} ${cy})`}
              fill={gold}
              opacity="0.55"
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}
