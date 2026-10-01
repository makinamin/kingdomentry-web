/**
 * Hairline skyline seen from street level: towers converge toward a vanishing
 * point above the frame, with floor lines and a few spires. Drawn in code, so it
 * scales to any band and inherits currentColor. Purely decorative.
 */
type Tower = { x: number; w: number; top: number; floors: number; mullions: number; spire?: boolean };

const VP = { x: 760, y: -1400 }; // vanishing point above the frame
const BASE = 1000;

const towers: Tower[] = [
  { x: 40, w: 150, top: 470, floors: 9, mullions: 2 },
  { x: 170, w: 210, top: 210, floors: 17, mullions: 3, spire: true },
  { x: 360, w: 120, top: 380, floors: 11, mullions: 2, spire: true },
  { x: 470, w: 160, top: 300, floors: 20, mullions: 4, spire: true },
  { x: 610, w: 130, top: 420, floors: 10, mullions: 2, spire: true },
  { x: 720, w: 110, top: 500, floors: 7, mullions: 1 },
  { x: 1010, w: 240, top: 120, floors: 23, mullions: 5 },
  { x: 1230, w: 200, top: 330, floors: 14, mullions: 3, spire: true },
  { x: 1400, w: 160, top: 520, floors: 8, mullions: 2 },
];

// Point on the line from a base point toward the vanishing point, at height y.
function toward(x: number, y: number) {
  const t = (BASE - y) / (BASE - VP.y);
  return x + (VP.x - x) * t;
}

function towerPaths(t: Tower) {
  const l0 = t.x;
  const r0 = t.x + t.w;
  const l1 = toward(l0, t.top);
  const r1 = toward(r0, t.top);
  const d: string[] = [`M${l0} ${BASE}L${l1.toFixed(1)} ${t.top}L${r1.toFixed(1)} ${t.top}L${r0} ${BASE}`];
  for (let i = 1; i < t.floors; i++) {
    // Floors bunch up with height, like perspective does.
    const k = 1 - Math.pow(1 - i / t.floors, 1.35);
    const y = BASE - (BASE - t.top) * k;
    d.push(`M${toward(l0, y).toFixed(1)} ${y.toFixed(1)}L${toward(r0, y).toFixed(1)} ${y.toFixed(1)}`);
  }
  for (let j = 1; j <= t.mullions; j++) {
    const xb = l0 + (t.w * j) / (t.mullions + 1);
    d.push(`M${xb.toFixed(1)} ${BASE}L${toward(xb, t.top).toFixed(1)} ${t.top}`);
  }
  if (t.spire) {
    const cx = (l1 + r1) / 2;
    d.push(`M${cx.toFixed(1)} ${t.top}L${toward(cx, t.top - 70).toFixed(1)} ${t.top - 70}`);
  }
  return d.join("");
}

const PATH = towers.map(towerPaths).join("");

export function SkylineLines({ className = "", opacity = 0.35 }: { className?: string; opacity?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <path d={PATH} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity={opacity} />
    </svg>
  );
}
